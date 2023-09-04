'use client'
import { MenuItem, Pagination, Paper, Select, TableContainer, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { FEC_candidate_PAC_money, FEC_search, searchCandidatePacMoney } from "../api/FEC-service";
import './politician.scss'
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

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
  const [barGraphWidth, setBarGraphWidth] = useState<number>(0)
  const [barGraphHeight, setBarGraphHeight] = useState<number>(0)
  const [barCount, setBarCount] = useState<number>(0)
  const [barGraphFont, setBarGraphFont] = useState<number>(0)

  const isLarge = useMediaQuery('(min-width: 1100px)')
  const isMedium = useMediaQuery('(min-width: 800px) and (max-width: 1100px)')
  const isSmall = useMediaQuery('(max-width: 800px)')

  useEffect(() => {
    if(isLarge){  
      setBarGraphWidth(900)
      setBarGraphHeight(500)
      setBarCount(3)
      setBarGraphFont(12)
    }
    if(isMedium){
      setBarGraphWidth(700)
      setBarGraphHeight(500)
      setBarCount(3)
      setBarGraphFont(12)
    }
    if(isSmall){
      setBarGraphWidth(400)
      setBarGraphHeight(300)
      setBarCount(2)
      setBarGraphFont(10)
    }
  }, [isLarge, isMedium, isSmall])

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
    if (pacResults) {
      totalDonations = pacResults.length
      let startingIndex = 0;
      let endingIndex = barCount
      setTotalPages(Math.ceil(totalDonations / barCount))
      const sortedResults = pacResults.sort((a, b) => (b.total - a.total))

      if (currentPage == 1) {
        setPacCollection(sortedResults.slice(startingIndex, endingIndex))
      }

      if (currentPage !== 1) {
        for (let i = 1; i < currentPage; i++) {
          startingIndex += barCount
        }
        endingIndex = startingIndex + barCount
        setPacCollection(sortedResults.slice(startingIndex, endingIndex))
      }

      setLoading(false)
    }
    if (pacResults && pacResults.length === 0) {
      setPacCollection(null)
    }

  }, [currentPage, pacResults, barCount, barGraphWidth])

  const truncateString = (name: string) => {
    const length = 20;
    if (!name) {
      return ''
    }
    if (name.length > length) {
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
                barSize={75}
                height={barGraphHeight}
                width={barGraphWidth}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                data={pacCollection?.map((x) => ({
                  name: x.committee_name,
                  total: x.total
                }))}>
                <Tooltip 
                  wrapperStyle={{fontSize: barGraphFont, width: '250px'}}
                  contentStyle={{whiteSpace: 'normal'}}
                  />
                <XAxis interval={0} dataKey="name" tickFormatter={(x => truncateString(x))} fontSize={barGraphFont}></XAxis>
                <YAxis dataKey="total"></YAxis>
                <Bar dataKey="total" fill="grey" />
              </BarChart>
              <Pagination count={totalPages} onChange={(e: any, page: any) => setCurrentPage(page)}></Pagination>
            </div>
          </TableContainer>
        </>
      )}

    </div>
  )
}

export default Politician;
