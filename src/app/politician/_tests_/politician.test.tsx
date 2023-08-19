import { render, waitFor } from "@testing-library/react"
import Politician, { paramsPolitician } from "../page"
import { FEC_candidate_PAC_money, FEC_search } from "../../api/FEC-service"
import { useMediaQuery } from "@mui/material"


const mockPolitician: FEC_search<FEC_candidate_PAC_money> = {
    api_version: '1.0',
    pagination: {
        count: 1,
        page: 1,
        pages: 1,
        per_page: 1,
    },
    results: [
        {
            candidate_name: 'John Doe',
            candidate_id: '1',
            count: 1,
            total: 1,
            committee_id: 'ABC123',
            cycle: 1,
            committee_name: 'TEST',
            support_oppose_indicator: 'S'
        }
    ]
}

const mockCandidatePacMoney: any = jest.fn((...args: any) => mockPolitician)

jest.mock('../../api/FEC-service', () => ({
    searchCandidatePacMoney: (...args: any) => mockCandidatePacMoney(...args)
}))

jest.mock('@mui/Material', () => ({
    MenuItem: jest.fn(),
    Pagination: jest.fn(),
    Paper: jest.fn(),
    Select: jest.fn((callback: any) => (
    <select id="cycleSelect" onChange={callback}>
        <option value={1} selected>1</option>
        <option value={2}>2</option>
    </select>)),
    TableContainer: jest.fn(),
    useMediaQuery: jest.fn()
}))

jest.mock('@mui/x-charts', () => ({
    BarChart: jest.fn()
}))

describe('Politician', () => {
    beforeEach(() => jest.clearAllMocks())

    it('render component without any issues', () => {
        renderComponent()

        const el = document.getElementById('tableContainer')
        expect(el).toBeTruthy();
    })

    it('header reflects politicians name', () => {
        renderComponent()

        const el = document.getElementById('politicianName')
        expect(el?.innerHTML).toEqual('John Doe')

    })

    it('searchCandidate called with params name', () => {
        renderComponent()

        expect(mockCandidatePacMoney).toHaveBeenCalledWith('AB1000', 2012)
    })
})

const renderComponent = () => {

    const defaultProps: paramsPolitician = {
        params: {},
        searchParams: {
            id: 'AB1000',
            cycles: '2010, 2012',
            party: 'I',
            name: 'John Doe'
        }
    }

    return render(
        <Politician {...defaultProps} />
    )
}