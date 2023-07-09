import { render, waitFor } from "@testing-library/react"
import Results, { paramsObject } from "../page"
import { searchCandidates } from "@/app/api/FEC-service";


jest.mock('../../../api/FEC-service', () => ({
    searchCandidates: jest.fn().mockResolvedValue(
        {
            api_version: '1.0',
            pagination: {
                count: 1,
                page: 1,
                pages: 1,
                per_page: 1,
            },
            results: [
                {
                    active_through: 0,
                    candidate_id: "string",
                    candidate_inactive: true,
                    candidate_status: "s",
                    cycles: [
                        0
                    ],
                    district: "st",
                    district_number: 0,
                    election_districts: [
                        "string"
                    ],
                    election_years: [
                        0
                    ],
                    federal_funds_flag: true,
                    first_file_date: "2023-06-14",
                    has_raised_funds: true,
                    inactive_election_years: [
                        0
                    ],
                    incumbent_challenge: "s",
                    incumbent_challenge_full: "string",
                    last_f2_date: "2023-06-14",
                    last_file_date: "2023-06-14",
                    load_date: "2023-06-14T16:00:52.247Z",
                    name: "john doe",
                    office: "s",
                    office_full: "string",
                    party: "str",
                    party_full: "string",
                    principal_committees: [
                        {
                            affiliated_committee_name: "string",
                            candidate_ids: [
                                "string"
                            ],
                            committee_id: "string",
                            committee_type: "s",
                            committee_type_full: "string",
                            cycles: [
                                0
                            ],
                            designation: "s",
                            designation_full: "string",
                            filing_frequency: "s",
                            first_f1_date: "2023-06-14",
                            first_file_date: "2023-06-14",
                            last_f1_date: "2023-06-14",
                            last_file_date: "2023-06-14",
                            name: "string",
                            organization_type: "s",
                            organization_type_full: "string",
                            party: "str",
                            party_full: "string",
                            state: "st",
                            treasurer_name: "string"
                        }
                    ],
                    state: "st"
                }
            ]
        }
    ),
}));


describe('Results', () => {
    beforeEach(() => jest.clearAllMocks())
    it("Render component without any issues", () => {
        renderComponent()

        const el = document.getElementById('tableContainer')
        expect(el).toBeTruthy()
    })

    it("loading notification visible on render", () => {
        renderComponent()

        const el = document.getElementById('loadingContainer')
        expect(el).toBeTruthy()
    })

    it("render component and populate table with information", async () => {
        renderComponent()
        await waitFor(() => expect(searchCandidates).toHaveBeenCalledTimes(1))

        const nameEl = document.getElementById('politicianName') 
        const stateEl = document.getElementById('politicianState')
        const partyEl = document.getElementById('politicianParty')
        const cycleEl = document.getElementById('politicianCycle')

        expect(nameEl?.innerHTML).toEqual('john doe')
        expect(stateEl?.innerHTML).toEqual('st')
        expect(partyEl?.innerHTML).toEqual('string')
        expect(cycleEl?.innerHTML).toEqual('0 ')
        
    })

})


const renderComponent = () => {

    const defaultProps: paramsObject = {
        params: {
            candidateQuery: 'John Doe'
        },
        searchParams: {}
    }

    return render(
        <Results {...defaultProps} />
    )
}