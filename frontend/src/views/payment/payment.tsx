import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionSaga } from 'src/services/action.saga'
import { ActionReducer } from 'src/services/action.reducer';
import { IStates } from 'src/stores/root.reducer';
import { PageContainer } from 'src/components'
import { Grid, makeStyles, Typography, Box, Button } from '@material-ui/core'
import { BookAction } from 'src/stores/book/book.action';
import { AlertModal, CardItem, Filter } from 'src/components/common';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Utility from 'src/utils/Utility';
import { ModalForm } from 'src/components/common';
import qrcode_test from 'src/assets/icons/qrcode_test.svg';
import { PaymentAction } from 'src/stores/payment/payment.action';
import { useHistory } from 'react-router';
import { CartAction } from 'src/stores/cart/cart.action';

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
    },
    textHeaderPayment: {
        fontWeight: 400,
        fontSize: '18px',
        marginBottom: '16px',
    },
    gridPayment: {
        marginBottom: '16px',
    },
    msgHelpText: {
        fontSize: '14px',
        textAlign: 'center',
        color: '#B42D2D',
    }
}))

const PaymentPage = () => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const bookStore = useSelector((state: IStates) => state.bookReducer);
    const paymentStore = useSelector((state: IStates) => state.paymentReducer);
    const [modalQRCode, setModalQRCode] = useState(false);
    const [alertModalSuccess, setAlertModalSuccess] = useState(false);
    const [alertModalFail, setAlertModalFail] = useState(false);
    const [checkPayment, setCheckPayment] = useState(false);
    const [modalAlert, setModalAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');

    useEffect(()=> {
        const paymentInterval = setInterval(() => {
            if(checkPayment) {
                dispatch(
                    ActionSaga({ 
                        type: PaymentAction.GET_PAYMENT_R,  
                        onSuccess: (response:any) => {
                            if(response.status == 2) {
                                setModalQRCode(false);
                                setAlertModalSuccess(true);
                                clearInterval(paymentInterval);
                            }else if(response.status ==3) {
                                setModalQRCode(false);
                                setAlertModalFail(true);
                                clearInterval(paymentInterval);
                            }
                        },
                    })
                )
            }
        }, 3000);

        return () => clearInterval(paymentInterval);
    }, [checkPayment])

    const onClickPayment = () => {
        dispatch(
            ActionSaga({ 
                type: BookAction.BOOK_LIST_R,  
                onSuccess: (response: any) => {
                    var isRemain = true;
                    paymentStore.list.forEach((value:any) => {
                        var book_remain = response.filter((k:any) => k.id == value.book.id);
                        if(book_remain[0].amount < value.amount) {
                            isRemain = false;
                        }
                    });
                    if(isRemain) {
                        var cart_id: any = [];
                        var sum_amount = 0;
                        paymentStore.list.forEach((value:any) => {
                            if(value.id) {
                                cart_id.push(value.id);
                            }
                            sum_amount += value.amount;
                        });
                        console.log(paymentStore.list);
                        console.log(sum_amount);
                        if(cart_id.length > 0) {
                            var data: object = {'price': paymentStore.total, 'cart_id': cart_id.toString(), 'amount': sum_amount};
                        }else {
                            var data: object = {'price': paymentStore.total, 'book_id': paymentStore.list[0].book.id, 'amount': sum_amount};
                        }
                        dispatch(
                            ActionSaga({ 
                                type: PaymentAction.PAYMENT_R,  
                                payload: data,
                                onSuccess: () => {
                                    setModalQRCode(true);
                                    setCheckPayment(true);
                                },
                            })
                        )
                    }else {
                        setMsgAlert('จำนวนสินค้าบางรายการไม่เพียงพอ กรุณาตรวจสอบสินค้าอีกครั้ง');
                        setModalAlert(true);
                    }
                },
            })
        )
    }

    return (
        <PageContainer header='รายการสินค้า'>
            {paymentStore.list.length > 0 ?
                <>
                    <Grid container spacing={3} className={classes.gridPayment}>
                        {paymentStore.list?.sort((a:any,b:any) => (a.book.name > b.book.name) ? 1 : ((b.book.name > a.book.name) ? -1 : 0)).map((item: any, key: any) => {
                            return (
                                <Grid key={key} item xs={12} sm={6} md={3}>
                                    <CardItem book_detail={item.book} cart={item} isPayment={true}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Box className={classes.boxPayment}>
                        <Typography className={classes.textTotal}>รวมทั้งสิ้น {Utility.priceFormat(paymentStore.total)} บาท</Typography>
                        <Button variant='contained' onClick={onClickPayment}>ชำระเงิน</Button>
                    </Box>
                </>
            :
                <Typography className={classes.textEmpty}>ไม่มีรายการชำระเงิน</Typography>
            }
            <ModalForm 
                open={modalQRCode}
                onClose={() => { 
                    setModalQRCode(false);
                }}
                title='ชำระเงิน'
            >
                <img src={qrcode_test} />
                <Typography className={classes.msgHelpText}>*สแกน QR Code เพื่อชำระเงิน</Typography>
            </ModalForm>
            <AlertModal
                open={alertModalSuccess}
                onClose={() => {
                    dispatch(
                        ActionSaga({ 
                            type: CartAction.CART_LIST_R,  
                            onSuccess: () => {
                                history.push('/');
                            },
                        })
                    )
                }}
                title="สำเร็จ!"
                text="ทำรายการสำเร็จ"
                titleButton="ตกลง"
            />
            <AlertModal
                open={alertModalFail}
                onClose={() => setAlertModalFail(false)}
                title="แจ้งเตือน!"
                text="ทำรายการไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
                titleButton="ตกลง"
            />
            <AlertModal
                open={modalAlert}
                onClose={() => setModalAlert(false)}
                title="แจ้งเตือน!"
                text={msgAlert}
                titleButton="รับทราบ"
            />
        </PageContainer>
    )
}

export default PaymentPage
