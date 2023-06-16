export interface FEC_search<T> {
    api_version: string;
    pagination: {
        count: number;
        page: number;
        pages: number;
        per_page: number;
    }
    results: T[] | null
}

export interface FEC_candidate_search_results {
    active_through: number;
    candidate_id: string;
    candidate_inactive: boolean;
    candidate_status: string;
    cycles: number[];
    district: string;
    district_number: number;
    election_districts: string[];
    election_years: number[];
    federal_funds_flag: boolean;
    first_file_date: string;
    has_raised_funds: boolean;
    inactive_election_years: number[]
    incumbent_challenge: string,
    incumbent_challenge_full: string,
    last_f2_date: string,
    last_file_date: string,
    load_date: string,
    name: string,
    office: string,
    office_full: string,
    party: string,
    party_full: string,
    principal_committees: FEC_candidate_search_principal_committees[],
    state: string;

}

export interface FEC_candidate_search_principal_committees {
    affiliated_committee_name: string,
    candidate_ids: string[],
    committee_id: string,
    committee_type: string,
    committee_type_full: string,
    cycles: number[];
    designation: string,
    designation_full: string,
    filing_frequency: string,
    first_f1_date: string,
    first_file_date: string,
    last_f1_date: string,
    last_file_date: string,
    name: string,
    organization_type: string,
    organization_type_full: string,
    party: string,
    party_full: string,
    state: string,
    treasurer_name: string
}

export const searchCandidates = async (candidate: string) => {
    try{
        const res = await fetch(`https://api.open.fec.gov/v1/candidates?api_key=${process.env.NEXT_PUBLIC_FEC_API_KEY}&name=${candidate}`);
        const jsonRes = await res.json();
        console.log(jsonRes)
        return jsonRes;
    }

    catch(e: any){
        return e;
    }  
}