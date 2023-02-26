import { TextField, makeStyles, InputAdornment } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1)
    }
}))

const BoxInput = (props: any) => {
    const { variant, placeholder, icon, children, readOnly=false, ...rest } = props
    const classes = useStyles();

    return (
        <TextField
            className={classes.root}
            placeholder={placeholder}
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true
            }}
            variant={variant}
            InputProps={{
                readOnly: readOnly,
                startAdornment: (
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                )
            }}
            {...rest}
        >
            {children}
        </TextField>
    )
}

export default BoxInput
