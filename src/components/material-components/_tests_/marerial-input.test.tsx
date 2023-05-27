import { MaterialInput } from "../material-input/MaterialInput";
import { TextFieldProps } from '@mui/material/TextField'
import { render } from '@testing-library/react'
import React from "react";

describe('Material input component', () => {
    
    it("Render component without any issues", () => {
        renderComponent({placeholder: 'test'})
    })

})

const renderComponent = (props: TextFieldProps) => {
    return render(
        <MaterialInput {...props}/>
    )
}