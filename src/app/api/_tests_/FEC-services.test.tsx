import { FEC_candidate_PAC_money, FEC_candidate_financial_summary, FEC_candidate_search_results, FEC_search, searchCandidatePacMoney, searchCandidateSummary, searchCandidates } from "../FEC-service";
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

const mockSummary: FEC_search<FEC_candidate_financial_summary>[] = [
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
            candidate_contribution: 0,
            individual_itemized_contributions: 0,
            disbursements: 0,
            contributions: 0,
            operating_expenditures: 0,
            fundraising_disbursements: 0,
            offsets_to_fundraising_expenditures: 0,
            last_debts_owed_to_committee: 0,
            candidate_id: "555",
            coverage_end_date: "2012-12-31T00:00:00+00:00",
            transfers_to_other_authorized_committee: 0,
            contribution_refunds: 0,
            net_operating_expenditures: 0,
            repayments_loans_made_by_candidate: 0,
            last_report_year: 2016,
            transaction_coverage_date: "2012-12-31T00:00:00+00:00",
            repayments_other_loans: 0,
            other_disbursements: 0,
            individual_unitemized_contributions: 0,
            exempt_legal_accounting_disbursement: 0,
            loans_received_from_candidate: 0,
            last_debts_owed_by_committee: 0,
            last_cash_on_hand_end_period: 0,
            net_contributions: 0,
            cycle: 2016,
            total_offsets_to_operating_expenditures: 0,
            other_receipts: 0,
            last_report_type_full: "test",
            loan_repayments_made: 0,
            individual_contributions: 0,
            refunded_other_political_committee_contributions: 0,
            coverage_start_date: "2015-04-02T00:00:00+00:0",
            other_loans_received: 0,
            offsets_to_legal_accounting: 0,
            refunded_individual_contributions: 0,
            offsets_to_operating_expenditures: 0,
            last_beginning_image_number: "0",
            other_political_committee_contributions: 0,
            refunded_political_party_committee_contributions: 0,
            candidate_election_year: 2016,
            political_party_committee_contributions: 9303.25,
            federal_funds: 0,
            receipts: 0,
            transfers_from_affiliated_committee: 0           
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

  it('should return candidate summary', async () => {

    fetchMock.mockResponseOnce(JSON.stringify(mockSummary));

    const testResults = await searchCandidateSummary('555')

    expect(fetchMock.mock.calls[0][0]).toContain('555');
    expect(testResults).toEqual(mockSummary);
    
  })

})