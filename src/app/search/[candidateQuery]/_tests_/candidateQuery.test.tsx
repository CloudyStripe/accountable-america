import { render } from "@testing-library/react"
import Results, { paramsObject } from "../page"

describe('Results', () => {
    it("Render component without any issues", () => {
        renderComponent()
    })
})

const renderComponent = () => {

    const defaultProps: paramsObject = {
        params: {
            candidateQuery: 'Jane Doe'
        },
        searchParams: {}
    }

    return render(
        <Results {...defaultProps}/>
    )
}