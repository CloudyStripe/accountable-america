'use client';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField'

export const MaterialInput: React.FC<TextFieldProps>  = (props) => {

    const {className, InputProps, placeholder, value, variant, onChange, sx} = props

    return (
        <TextField
            className={className}
            onChange={onChange}
            InputProps={InputProps}
            value={value}
            placeholder={placeholder}
            variant={variant}
            sx={sx}
        />
    )
}