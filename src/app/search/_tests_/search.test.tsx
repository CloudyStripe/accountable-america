import { render } from "@testing-library/react"

import Search from "../page"

jest.mock('next/link', () => jest.fn());
describe('Search', () => {
    it("Render component without any issues", () => {
        renderComponent()
    })

})

const renderComponent = () => {
    return render(
        <Search />
    )
}