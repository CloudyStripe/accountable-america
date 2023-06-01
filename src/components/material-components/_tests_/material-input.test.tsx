import { MaterialInput } from "../material-input/MaterialInput";
import { TextFieldProps } from '@mui/material/TextField'
import { render, screen } from '@testing-library/react'
import React from "react";

describe('Material input component', () => {
    
    it("Render component without any issues", () => {
        renderComponent({})
    })

    it("Placeholder is set and visible", () => {
        renderComponent({id: "mock-input", placeholder: "test search"})

        const el = screen.getByPlaceholderText('test search')
        expect(el).toBeTruthy()
    })

})

const renderComponent = (props: TextFieldProps) => {
    return render(
        <MaterialInput {...props}/>
    )
}