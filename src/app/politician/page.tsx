'use client'
import { MenuItem, Paper, Select, TableContainer } from "@mui/material";
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
  const [isLoading, setLoading] = useState<boolean>(true)
  const [currentCycle, setCurrentCycle] = useState<string>(cycles[cycles.length - 1])

  useEffect(() => {
    const searchPAC = async () => {
      const results: FEC_search<FEC_candidate_PAC_money> = await searchCandidatePacMoney(searchParams.id, +currentCycle)
      setPacResults(pacResults)
      if (results) {
        setLoading(false)
      }
    }

    searchPAC()
  })

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
                  data: ['bar A', 'bar B', 'bar C'],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: [2, 5, 3],
                },
              ]}
              width={500}
              height={300} />
          </TableContainer>
        </>
      )}

    </div>
  )
}

export default Politician;
