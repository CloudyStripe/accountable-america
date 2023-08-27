'use client'
import { MenuItem, Pagination, Paper, Select, TableContainer, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { FEC_candidate_PAC_money, FEC_search, searchCandidatePacMoney } from "../api/FEC-service";
import './politician.scss'
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
  const [width, setWidth] = useState<number>(0)
  console.log([pacCollection?.map((x) => ({
    name: x.committee_name,
    total: x.total
  }))])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

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
      let endingIndex = 3
      setTotalPages(Math.ceil(totalDonations / 3))
      const sortedResults = pacResults.sort((a, b) => (b.total - a.total))

      if (currentPage == 1) {
        setPacCollection(sortedResults.slice(startingIndex, endingIndex))
      }

      if (currentPage !== 1) {
        for (let i = 1; i < currentPage; i++) {
          startingIndex += 3
        }
        endingIndex = startingIndex + 3
        setPacCollection(sortedResults.slice(startingIndex, endingIndex))
      }

      setLoading(false)
    }
    if (pacResults && pacResults.length === 0) {
      setPacCollection(null)
    }

  }, [currentPage, pacResults])

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
                height={500}
                width={1000}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                data={pacCollection?.map((x) => ({
                  name: x.committee_name,
                  total: x.total
                }))}>
                <XAxis dataKey="name" fontSize={3}></XAxis>
                <YAxis dataKey="total"></YAxis>
                <Bar dataKey="total" fill="#8884d8" />
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
