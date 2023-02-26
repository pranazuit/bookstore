import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionSaga } from 'src/services/action.saga'
import { ActionReducer } from 'src/services/action.reducer';
import { IStates } from 'src/stores/root.reducer';
import { PageContainer } from 'src/components'
import { Grid, makeStyles, TextField, Box, Typography, CircularProgress, InputAdornment, Card, CardActions, CardContent, Button } from '@material-ui/core'
import { BookAction } from 'src/stores/book/book.action';
import { CardItem } from 'src/components/common';
import { HistoryAction } from 'src/stores/history/history.action';

const useStyles = makeStyles((theme) => ({
    textEmpty: {
        textAlign: 'center',
    },
}))

const HistoryPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const historyStore = useSelector((state: IStates) => state.historyReducer);

    useEffect(() => {
        dispatch(
            ActionSaga({ 
                type: HistoryAction.HISTORY_LIST_R,  
            })
        )
    }, [dispatch])

    return (
        <PageContainer header='ประวัติการสั่งซื้อ'>
            {historyStore.list.length > 0 ?
                <Grid container spacing={3}>
                    {historyStore.list?.map((item: any, key: any) => {
                        return (
                            <Grid key={key} item xs={12} sm={6} md={3}>
                                <CardItem book_detail={item} isHistory={true}/>
                            </Grid>
                        )
                    })}
                </Grid>
            :
                <Typography className={classes.textEmpty}>ไม่มีประวัติการสั่งซื้อ</Typography>
            }
        </PageContainer>
    )
}

export default HistoryPage
