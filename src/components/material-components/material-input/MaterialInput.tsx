'use client';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField'

export const MaterialInput: React.FC<TextFieldProps>  = (props) => {

    const {className, InputProps, id, placeholder, value, variant, onChange, sx} = props

    return (
        <TextField
            className={className}
            onChange={onChange}
            InputProps={InputProps}
            id={id}
            value={value}
            placeholder={placeholder}
            variant={variant}
            sx={sx}
        />
    )
}