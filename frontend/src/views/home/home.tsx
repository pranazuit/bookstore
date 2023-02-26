import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionSaga } from 'src/services/action.saga'
import { ActionReducer } from 'src/services/action.reducer';
import { IStates } from 'src/stores/root.reducer';
import { PageContainer } from 'src/components'
import { Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { BookAction } from 'src/stores/book/book.action';
import { CardItem, Filter } from 'src/components/common';
import { useFormik } from 'formik';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
    inputFilter: {
        '& select': {
            height: '25px',
            lineHeight: '28px'
        },
        '& input': {
            height: '25px'
        }
    },
    textEmpty: {
        textAlign: 'center',
    },
}))

const BookDetailPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const bookStore = useSelector((state: IStates) => state.bookReducer);

    useEffect(() => {
        dispatch(
            ActionSaga({ 
                type: BookAction.BOOK_LIST_R,  
                onSuccess: () => {
                    
                },
            })
        )
    }, [dispatch])

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: (values) => {
            dispatch(
                ActionSaga({ 
                    type: BookAction.BOOK_LIST_R,  
                    payload: values,
                    onSuccess: () => {
                        
                    },
                })
            )
        }
    })

    return (
        <PageContainer>
            <Filter onSubmit={formik.handleSubmit}>
              <Grid item sm={12}>
                <TextField
                  autoComplete="off"
                  className={classes.inputFilter}
                  name="name"
                  placeholder="ค้นหาหนังสือ"
                  label="หนังสือ"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                      shrink: true,
                  }}
                  size="small"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Filter>
            {bookStore.list.length > 0 ?
                <Grid container spacing={3}>
                    {bookStore.list?.map((item: any, key: any) => {
                        return (
                            <Grid key={key} item xs={12} sm={6} md={3}>
                                <CardItem book_detail={item} isAction={true}/>
                            </Grid>
                        )
                    })}
                </Grid>
            :
                <Typography className={classes.textEmpty}>ไม่มีสินค้า</Typography>
            }
        </PageContainer>
    )
}

export default BookDetailPage
