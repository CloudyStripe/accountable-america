'use client'
import { Paper, TableContainer } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import styles from './page.module.css'

export interface paramsPolitician {
  params: {},
  searchParams: {
    id: string;
  }
}

const Politician: React.FC<paramsPolitician> = (props) => {

  const { searchParams } = props;
  console.log(searchParams)

  return (
    <div id="tableContainer" className={styles.tableContainer}>
      <h1>TEST</h1>
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
          height={300}
        />
      </TableContainer>
    </div>
  )
}

export default Politician;
