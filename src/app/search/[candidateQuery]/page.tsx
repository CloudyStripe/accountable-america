'use client'
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import styles from './page.module.scss'
import { FEC_candidate_search_results, FEC_search, searchCandidates } from '@/app/api/FEC-service';

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
        <>
            <div>Results</div>
            {isLoading && (
                <div>Loading...</div>
            )}

            {(!isLoading && candidateResults) && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    State
                                </TableCell>
                                <TableCell>
                                    Party Affiliation
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {candidateResults.results && (
                                candidateResults.results.map(x => (
                                    <TableRow>
                                        <TableCell>{x.name}</TableCell>
                                        <TableCell>{x.state}</TableCell>
                                        <TableCell>{x.party_full}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}

export default Results