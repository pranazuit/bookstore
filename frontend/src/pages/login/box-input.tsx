import { 
    TextField, 
    makeStyles, 
    InputAdornment,
    IconButton,
} from '@material-ui/core'
import {
    Visibility,
    VisibilityOff,
} from '@material-ui/icons';
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1)
    }
}))

const BoxInput = (props: any) => {
    const { variant, placeholder, icon, type, ...rest } = props
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            className={classes.root}
            placeholder={placeholder}
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true
            }}
            type={type !== 'password' ?  type: showPassword ? 'text' : 'password'}
            variant={variant}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                ),
                endAdornment: (
                    type === 'password' ?
                    <>
                      <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    </>
                    :''
                )
            }}
            {...rest}
        />
    )
}

export default BoxInput
