import { Box, Button, Grid, Paper, makeStyles } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        height: 'auto',
        marginBottom: 20,
        padding: '40px 30px 33px 30px'
    },
    wrapperBar: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        paddingRight: 120,
        '& .MuiFormControl-root': {
            padding: 0
        },
        '& .MuiGrid-item': {
            paddingBottom: 0
        },
    },
    btnSearch: {
        textAlign: 'right',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100px',
        '& button':{
            height: 46,
            color: '#000000',
            border: '2px solid #000000',
            backgroundColor: '#ffffff',
        },
        display: 'flex',
        height: '100%',
        alignItems: 'center',
    }
}))

interface IFilter {
    children: any
    onSubmit?: () => void

}

const Filter = (props: IFilter) => {

    const { children, onSubmit } = props
    const classes = useStyles()

    return (
        <Paper className={classes.root}>
            <Grid className={classes.wrapperBar} container>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {children}
                    </Grid>
                </Grid>
                <Box className={classes.btnSearch}>
                    <Button startIcon={<Search/>} variant="contained" onClick={onSubmit}>ค้นหา</Button>
                </Box>
            </Grid>
        </Paper>
    )
}

export default Filter
