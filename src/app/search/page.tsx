'use client'
import { MouseEvent, useState } from 'react';
import { MaterialInput } from '@/components/material-components/material-input/MaterialInput'
import { Container, IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Link from "next/link"
import styles from './page.module.scss'
import { searchCandidates } from '../api/FEC-service';

const Search: React.FC = () => {

  const [candidate, setCandidate] = useState<string>('')

  return (
    <Container className={styles.container}>
        <div className={styles.header}>Accountable America</div>
        <div className={styles.searchContainer}>
            <MaterialInput
              className={styles.searchInput}
              id='searchInput'
              placeholder='Search for a candidate...'
              onChange={e => setCandidate(e.target.value)}
              InputProps={{
                startAdornment:
                <InputAdornment position='start'>
                  <Link href={`/search/${candidate}`}>
                    <IconButton
                      aria-label='Search'
                      id='submitButton'
                    >
                      <SearchIcon/>
                  </IconButton>
                  </Link>
                </InputAdornment>,
                endAdornment:
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='Enable advanced search'
                    id='advancedSearchButton'
                  >
                    <DehazeIcon/>
                  </IconButton>
                </InputAdornment>,
              }}   
            />
        </div>
    </Container>
  )
}

export default Search