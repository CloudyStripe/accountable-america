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
  const [currentPage, setCurrentPage] = useState<number>(0)

  let totalDonations = 0;
  const donationsPerPage = 5;

  useEffect(() => {
    const searchPAC = async () => {
      const results: FEC_search<FEC_candidate_PAC_money> = await searchCandidatePacMoney(searchParams.id, +currentCycle)
      setPacResults(results.results)
      if (results) {
        setLoading(false)
      }
    }

    searchPAC()
    
  }, [currentCycle])

  useEffect(() => {
    if(pacResults){
      totalDonations = pacResults.length
      setTotalPages(Math.ceil(totalDonations / donationsPerPage))
      setPacCollection(pacResults.slice(0, 5))
      
    }
  }, [pacResults])

  useEffect(() => {
    if(pacResults){
      let startingIndex = 0;
      let endingIndex = 5

      for( let i = 1; i < currentPage; i++){
        startingIndex += 5
        endingIndex = startingIndex + 5
      }

      setPacCollection(pacResults.slice(startingIndex, endingIndex))
    }

  }, [currentPage])

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
          <TableContainer component={Paper}>
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: ['bar A', 'bar B', 'bar C', 'bar D', 'bar E'],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: [2, 5, 3, 4, 5],
                },
              ]}
              width={500}
              height={300} />
              <Pagination count={totalPages} onChange={(e: any, page: any) => setCurrentPage(page)}></Pagination>
          </TableContainer>
        </>
      )}

    </div>
  )
}

export default Politician;
