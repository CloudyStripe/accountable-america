'use client'
import { MaterialInput } from '@/components/material-components/material-input/MaterialInput'
import { Container } from '@mui/material'
import styles from './page.module.scss'

const Search = () => {
  return (
    <Container>
        <div className={styles.header}>Main</div>
        <div className={styles.searchContainer}>
            <MaterialInput/>
        </div>
    </Container>
  )
}

export default Search