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

export interface FEC_candidate_PAC_money {
    candidate_name: string,
    candidate_id: string,
    count: number,
    total: number,
    committee_id: string,
    cycle: number,
    committee_name: string,
    support_oppose_indicator: "S" | "O"
}

export interface FEC_candidate_financial_summary {
    candidate_contribution: number,
    individual_itemized_contributions: number,
    disbursements: number,
    contributions: number,
    operating_expenditures: number,
    fundraising_disbursements: number,
    offsets_to_fundraising_expenditures: number,
    last_debts_owed_to_committee: number,
    candidate_id: string,
    coverage_end_date: string,
    transfers_to_other_authorized_committee: number,
    contribution_refunds: number,
    net_operating_expenditures: number,
    repayments_loans_made_by_candidate: number,
    other_disbursements: number,
    individual_unitemized_contributions: number,
    exempt_legal_accounting_disbursement: number,
    loans_received_from_candidate: number,
    last_debts_owed_by_committee: number,
    last_cash_on_hand_end_period: number,
    net_contributions: number,
    cycle: number,
    total_offsets_to_operating_expenditures: number,
    other_receipts: number,
    last_report_type_full: string,
    last_report_year: number,
    loan_repayments_made: number,
    individual_contributions: number,
    repayments_other_loans: number
    refunded_other_political_committee_contributions: number,
    coverage_start_date: string,
    other_loans_received: number,
    offsets_to_legal_accounting: number,
    refunded_individual_contributions: number,
    offsets_to_operating_expenditures: number,
    last_beginning_image_number: string,
    other_political_committee_contributions: number,
    refunded_political_party_committee_contributions: number,
    candidate_election_year: number,
    political_party_committee_contributions: number,
    federal_funds: number,
    receipts: number,
    transfers_from_affiliated_committee: number
    transaction_coverage_date: string
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

export const searchCandidatePacMoney = async (candidateId: string, cycle?: number) => {
    try{
        const res = await fetch(`https://api.open.fec.gov/v1/schedules/schedule_e/by_candidate?api_key=${process.env.NEXT_PUBLIC_FEC_API_KEY}&candidate_id=${candidateId}&cycle=${cycle}`);
        const jsonRes = await res.json();
        console.log(jsonRes)
        return jsonRes;
    }

    catch(e: any){
        return e;
    }  
}

export const searchCandidateSummary= async (candidateId: string) => {
    try{
        const res = await fetch(`https://api.open.fec.gov/v1/candidate/${candidateId}/totals?api_key=${process.env.NEXT_PUBLIC_FEC_API_KEY}`);
        const jsonRes = await res.json();
        console.log(jsonRes)
        return jsonRes;
    }

    catch(e: any){
        return e;
    }  
}