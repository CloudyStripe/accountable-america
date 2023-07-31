'use client'
import { MenuItem, Pagination, Paper, Select, TableContainer } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import styles from './page.module.css'
import { useEffect, useState } from "react";
import { FEC_candidate_PAC_money, FEC_search, searchCandidatePacMoney } from "../api/FEC-service";

export interface paramsPolitician {
  params: {},
  searchParams: {
    id: string,
    cycles: string,
    party: string,
    name: string
  }
}

const Politician: React.FC<paramsPolitician> = (props) => {

  const { searchParams } = props
  const cycles = searchParams.cycles.split(',')


  const [pacResults, setPacResults] = useState<Array<FEC_candidate_PAC_money> | null>(null)
  const [pacCollection, setPacCollection] = useState<Array<FEC_candidate_PAC_money> | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [currentCycle, setCurrentCycle] = useState<string>(cycles[cycles.length - 1])

  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  let totalDonations = 0;
  const donationsPerPage = 5;

  useEffect(() => {
    setLoading(true)
    const searchPAC = async () => {
      const results: FEC_search<FEC_candidate_PAC_money> = await searchCandidatePacMoney(searchParams.id, +currentCycle)
      setPacResults(results.results)
    }

    searchPAC()

  }, [currentCycle])

  const truncateString = (name: string) => {
    const length = 20;
    if(!name){
      return ''
    }
    if(name.length > length){
      return (name.slice(0, length) + '...')
    }
    debugger;
    return name;
  }

  useEffect(() => {
    if(pacResults){
      totalDonations = pacResults.length
      let startingIndex = 0;
      let endingIndex = 5
      setTotalPages(Math.ceil(totalDonations / donationsPerPage))
      const sortedResults = pacResults.sort((a, b) => (b.total - a.total))

      if(currentPage == 1){
        setPacCollection(sortedResults.slice(startingIndex, endingIndex))
      }

      if(currentPage !== 1){
        for( let i = 1; i < currentPage; i++){
          startingIndex += 5
        }
        endingIndex = startingIndex + donationsPerPage
        setPacCollection(sortedResults.slice(startingIndex, endingIndex))
      }

      setLoading(false)
    }
    if(pacResults && pacResults.length === 0){
      setPacCollection(null)
    }

  }, [currentPage, pacResults])

  return (

    <div id="tableContainer" className={styles.tableContainer}>
      {isLoading && (
        <div id="loadingContainer">Loading...</div>
      )}
      {!isLoading && (
        <>
          <h1>{searchParams.name}</h1>
          <Select
            onChange={e => setCurrentCycle(e.target.value as string)}
            value={currentCycle}
            >
            {cycles.map(x => (
              <MenuItem value={x}>{x}</MenuItem>
            ))}
          </Select>
          <TableContainer  component={Paper}>
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: pacCollection?.map(x => truncateString(x.committee_name)) || ['N/A'],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: pacCollection?.map(x => (x.total)) || [0]
                },
              ]}
              width={1500}
              height={300} />
              <Pagination count={totalPages} onChange={(e: any, page: any) => setCurrentPage(page)}></Pagination>
          </TableContainer>
        </>
      )}

    </div>
  )
}

export default Politician;
