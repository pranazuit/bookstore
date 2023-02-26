import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { Page } from 'src/components'
import BoxLogin from './box-login'

const useStyles = makeStyles(() => ({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#eee',
    },
}))

const LoginPage = () => {

    const classes = useStyles()

    return (
        <Page className={classes.root}>
            <BoxLogin/>
        </Page>
    )
}

export default LoginPage
