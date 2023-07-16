'use client'
import { Paper, TableContainer } from "@mui/material";
import styles from './page.module.css'

export interface paramsPolitician {
  params: {},
  searchParams: {
    name: string;
  }
}

const Politician: React.FC<paramsPolitician> = (props) => {

  const {searchParams} = props;

  return (
    <div id="tableContainer" className={styles.tableContainer}>
      <h1>{searchParams.name}</h1>
      <TableContainer component={Paper}>
        <div>Politician</div>
        <div>Graph</div>
        <div>Total individual contributions</div>
        <div>Total PAC contributions</div>
      </TableContainer>
    </div>
  )
}

export default Politician;
