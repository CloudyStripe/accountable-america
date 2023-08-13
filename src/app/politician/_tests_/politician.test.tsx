import { render } from "@testing-library/react"
import Politician, { paramsPolitician } from "../page"

describe('Politician', () => {
    beforeEach(() => jest.clearAllMocks())

    it('render component without any issues', () => {
        renderComponent()

        const el = document.getElementById('tableContainer')
        expect(el).toBeTruthy();
    })
})

const renderComponent = () => {

    const defaultProps: paramsPolitician = {
        params: { },
        searchParams: {
            id: 'AB1000',
            cycles: '2010, 2012',
            party: 'I',
            name: 'John Doe'
        }
    }

    return render(
        <Politician {...defaultProps}/>
    )
}