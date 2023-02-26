import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionSaga } from 'src/services/action.saga'
import { ActionReducer } from 'src/services/action.reducer';
import { IStates } from 'src/stores/root.reducer';
import { PageContainer } from 'src/components'
import { Grid, makeStyles, TextField, Box, Typography, CircularProgress, InputAdornment, Card, CardActions, CardContent, Button } from '@material-ui/core'
import { CardItem } from 'src/components/common';
import Utility from 'src/utils/Utility';
import { PaymentAction } from 'src/stores/payment/payment.action';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    textEmpty: {
        textAlign: 'center',
    },
    boxPayment: {
        textAlign: 'center',
        marginTop: '30px',
    },
    textTotal: {
        marginBottom: '10px',
        color: '#B42D2D',
        fontWeight: 'bold',
    }
}))

const CartPage = () => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const cartStore = useSelector((state: IStates) => state.cartReducer);
    const [selectProduct, setSelectProduct] = useState([]);
    const [total, setTotal] = useState(0);
    const paymentStore = useSelector((state: IStates) => state.paymentReducer);

    const handleSelectProduct = (event: any, isChecked:any) => {
        var data:any = selectProduct;
        if (isChecked) {
            var product = cartStore.list.filter((k:any) => k.id == event.target.value);
            data.push(product[0]);
            setSelectProduct(data);
        }else {
            var index = data.findIndex((k:any) => k.id == event.target.value);
            data.splice(index,1);
            setSelectProduct(data);
        }
        calTotal(selectProduct, cartStore.list);
    };

    const calTotal = (data: any, cartList: any) => {
        let sum = 0;
        data.forEach((value:any) => {
            var cart = cartList.filter((k:any) => k.id == value.id);
            sum += parseFloat(value.book.price) * cart[0].amount;
        });
        setTotal(sum);
    }

    const handleRemoveSelectProduct = (cart_id: any) => {
        var index = selectProduct.findIndex((k:any) => k.id == cart_id);
        if(index !== -1) {
            var data = selectProduct;
            data.splice(index,1);
            setSelectProduct(data);
        }
        calTotal(selectProduct, cartStore.list);
    }

    const onClickPayment = () => {
        var data = { 'total': total, 'list': selectProduct }
        dispatch(
            ActionSaga({ 
                type: PaymentAction.PAYMENT_LIST_S,
                payload: data,
            })
        )
        history.push('/payment');
    }

    return (
        <PageContainer header='ตะกร้าสินค้า'>
            {cartStore.list.length > 0 ?
                <>
                    <Grid container spacing={3}>
                        {cartStore.list?.map((item: any, key: any) => {
                            return (
                                <Grid key={key} item xs={12} sm={6} md={3}>
                                    <CardItem book_detail={item.book} cart={item} isCart={true} handleSelectProduct={handleSelectProduct} handleRemoveSelectProduct={handleRemoveSelectProduct} selectProduct={selectProduct} calTotal={calTotal}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Box className={classes.boxPayment}>
                        <Typography className={classes.textTotal}>รวมทั้งสิ้น {Utility.priceFormat(total)} บาท</Typography>
                        <Button variant='contained' onClick={onClickPayment} disabled={selectProduct.length == 0 ? true: false}>ไปหน้าชำระเงิน</Button>
                    </Box>
                </>
            :
                <Typography className={classes.textEmpty}>ไม่พบสินค้าในตะกร้า</Typography>
            }
            
        </PageContainer>
    )
}

export default CartPage
