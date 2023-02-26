import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionSaga } from 'src/services/action.saga'
import { ActionReducer } from 'src/services/action.reducer';
import { IStates } from 'src/stores/root.reducer';
import { PageContainer } from 'src/components'
import { Grid, makeStyles, TextField, Box, Typography, CircularProgress, InputAdornment, Card, CardActions, CardContent, Button } from '@material-ui/core'
import { BookAction } from 'src/stores/book/book.action';
import { CardItem } from 'src/components/common';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    gridBookDetail: {
        justifyContent: 'center',
    }
}))

const HomePage = () => {
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    const bookStore = useSelector((state: IStates) => state.bookReducer);
    const history = useHistory();

    useEffect(() => {
        var data = { 'book_id': id };
        dispatch(
            ActionSaga({ 
                type: BookAction.BOOK_DETAIL_R,  
                payload: data,
                onFailure: () => {
                    history.push('/404');
                },
            })
        )
    }, [dispatch])

    return (
        <PageContainer header='รายละเอียดสินค้า'>
            <Grid className={classes.gridBookDetail} container spacing={3}>
                <Grid item xs={10} sm={8} md={6}>
                    <CardItem book_detail={bookStore.detail} isDetail={true} isAction={true}/>
                </Grid>
            </Grid>
        </PageContainer>
    )
}

export default HomePage
