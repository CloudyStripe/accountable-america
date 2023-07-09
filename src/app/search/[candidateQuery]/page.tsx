'use client'
import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FEC_candidate_search_results, FEC_search, searchCandidates } from '@/app/api/FEC-service';
import { Rubik } from 'next/font/google';

import styles from './page.module.scss'

const rubik  = Rubik({ subsets: ['latin'] })
export interface paramsObject {
    params: {
        candidateQuery: string;
    }
    searchParams: {}
}

const Results: React.FC<paramsObject> = (props) => {

    const { params } = props;
    const [candidateResults, setCandidateResults] = useState<FEC_search<FEC_candidate_search_results> | null>(null)
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {

        const searchCandidate = async () => {
            const results: FEC_search<FEC_candidate_search_results> = await searchCandidates(params.candidateQuery)
            console.log(results)
            setCandidateResults(results)
            if (results) {
                setLoading(false)
            }
        }

        searchCandidate()

    }, [])


    return (
        <div id="tableContainer" className={styles.tableContainer}>
            {isLoading && (
                <div id="loadingContainer">Loading...</div>
            )}

            {(!isLoading && candidateResults) && (
                <TableContainer className={`${rubik.className} ${styles.table}`} component={Paper}>
                    <Table>
                        <TableHead className={styles.tableHeader}>
                            <TableRow>
                                <TableCell className={styles.test}>
                                    Name
                                </TableCell>
                                <TableCell className={styles.test}>
                                    State
                                </TableCell>
                                <TableCell className={styles.test}>
                                    Party Affiliation
                                </TableCell>
                                <TableCell className={styles.test}>
                                    Election Year(s)
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={styles.tableBody}>
                            {candidateResults.results && (
                                candidateResults.results.map(x => (
                                    <TableRow>
                                        <TableCell id='politicianName'>{x.name}</TableCell>
                                        <TableCell id='politicianState'>{x.state}</TableCell>
                                        <TableCell id='politicianParty'>{x.party_full}</TableCell>
                                        <TableCell id='politicianCycle'>{x.election_years.map(x => `${x} `)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    )
}

export default Results