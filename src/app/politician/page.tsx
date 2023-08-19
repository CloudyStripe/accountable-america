'use client'
import { MenuItem, Pagination, Paper, Select, TableContainer, useMediaQuery } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { FEC_candidate_PAC_money, FEC_search, searchCandidatePacMoney } from "../api/FEC-service";
import './politician.scss'

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

  const [groupSizeIndex, setGroupSizeIndex] = useState<number>(5)
  const [pacResults, setPacResults] = useState<Array<FEC_candidate_PAC_money> | null>(null)
  const [pacCollection, setPacCollection] = useState<Array<FEC_candidate_PAC_money> | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [currentCycle, setCurrentCycle] = useState<string>(cycles[cycles.length - 1])
  const [width, setWidth] = useState<number>(0)

  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const isXl = useMediaQuery('(max-width:1400px)')
  const isL = useMediaQuery('(max-width:1200px)')
  const isM = useMediaQuery('(max-width:900px)')

  useEffect(() => {
    const checkWidth = () => {
      if(isM){
        setGroupSizeIndex(2)
        return
      }
      if(isL){
        setWidth(800)
        setGroupSizeIndex(4)
        return
      }    
      if(isXl){
        setWidth(1000)
        setGroupSizeIndex(5)
        return
      }  
      setGroupSizeIndex(5)
      setWidth(1200)
    }
  
    checkWidth()

  }, [isXl, isL, isM])

  let totalDonations = 0;

  useEffect(() => {
    setLoading(true)
    const searchPAC = async () => {
      const results: FEC_search<FEC_candidate_PAC_money> = await searchCandidatePacMoney(searchParams.id, +currentCycle)
      setPacResults(results.results)
    }

    searchPAC()

  }, [currentCycle])

  useEffect(() => {
    if(pacResults){
      totalDonations = pacResults.length
      let startingIndex = 0;
      let endingIndex = groupSizeIndex
      setTotalPages(Math.ceil(totalDonations / groupSizeIndex))
      const sortedResults = pacResults.sort((a, b) => (b.total - a.total))

      if(currentPage == 1){
        setPacCollection(sortedResults.slice(startingIndex, endingIndex))
      }

      if(currentPage !== 1){
        for( let i = 1; i < currentPage; i++){
          startingIndex += groupSizeIndex
        }
        endingIndex = startingIndex + groupSizeIndex
        setPacCollection(sortedResults.slice(startingIndex, endingIndex))
      }

      setLoading(false)
    }
    if(pacResults && pacResults.length === 0){
      setPacCollection(null)
    }

  }, [currentPage, pacResults, groupSizeIndex])

  const truncateString = (name: string) => {
    const length = 20;
    if(!name){
      return ''
    }
    if(name.length > length){
      return (name.slice(0, length) + '...')
    }
    return name;
  }

  return (

    <div id="tableContainer" className='tableContainer'>
      <h1 id="politicianName">{searchParams.name}</h1>
      {isLoading && (
        <div id="loadingContainer">Loading...</div>
      )}
      {!isLoading && (
        <>
          <Select
            onChange={e => setCurrentCycle(e.target.value as string)}
            value={currentCycle}
          >
            {cycles.map(x => (
              <MenuItem value={x}>{x}</MenuItem>
            ))}
          </Select>
          <TableContainer component={Paper}>
            <div className='bigDonorGraphContainer'>
              <BarChart
                xAxis={[
                  {
                    id: 'barCategories',
                    data: pacCollection?.map(x => truncateString(x.committee_name)) || ['N/A'],
                    scaleType: 'band'
                  }
                ]}
                series={[
                  {
                    data: pacCollection?.map(x => (x.total)) || [0]
                  },
                ]}
                width={width}
                height={300} />
              <Pagination count={totalPages} onChange={(e: any, page: any) => setCurrentPage(page)}></Pagination>
            </div>
          </TableContainer>
        </>
      )}

    </div>
  )
}

export default Politician;
