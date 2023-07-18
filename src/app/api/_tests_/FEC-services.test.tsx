import { FEC_candidate_PAC_money, FEC_candidate_search_results, FEC_search, searchCandidatePacMoney, searchCandidates } from "../FEC-service";
import fetchMock from 'jest-fetch-mock'

const mockCandidates: FEC_search<FEC_candidate_search_results>[] = [
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
]

const mockPAC: FEC_search<FEC_candidate_PAC_money>[] = [
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
             candidate_name: 'john doe',
             candidate_id: '555',
             count: 0,
             cycle: 0,
             total: 0,
             committee_id: '1A',
             committee_name: 'TEST',
             support_oppose_indicator: 'O'
             
          }
      ]
  }
]

describe('FEC service', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return candidate', async () => {

    fetchMock.mockResponseOnce(JSON.stringify(mockCandidates));

    const testResults = await searchCandidates('John')

    expect(fetchMock.mock.calls[0][0]).toContain('John');
    expect(testResults).toEqual(mockCandidates);
    
  })

  it('should return candidate PAC money', async () => {

    fetchMock.mockResponseOnce(JSON.stringify(mockPAC));

    const testResults = await searchCandidatePacMoney('555')

    expect(fetchMock.mock.calls[0][0]).toContain('555');
    expect(testResults).toEqual(mockPAC);
    
  })

})