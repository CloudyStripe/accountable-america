'use client'
import { MaterialInput } from '@/components/material-components/material-input/MaterialInput'
import { Container, IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import DehazeIcon from '@mui/icons-material/Dehaze';
import styles from './page.module.scss'

const Search = () => {
  return (
    <Container className={styles.container}>
        <div className={styles.header}>Accountable America</div>
        <div className={styles.searchContainer}>
            <MaterialInput
              className={styles.searchInput}
              InputProps={{
                startAdornment:
                <InputAdornment position='start'>
                  <IconButton
                    aria-label='Search'
                  >
                    <SearchIcon className='submitButton'></SearchIcon>
                  </IconButton>
                </InputAdornment>,
                endAdornment:
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Enable advanced search'
                  >
                    <DehazeIcon className='submitButton'></DehazeIcon>
                  </IconButton>
                </InputAdornment>,
              }}   
              placeholder='Search for a candidate...'
            />
        </div>
    </Container>
  )
}

export default Search