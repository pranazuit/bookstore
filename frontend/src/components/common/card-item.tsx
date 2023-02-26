import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStates } from 'src/stores/root.reducer';
import { ActionSaga } from 'src/services/action.saga'
import { Box, makeStyles, Typography, CardMedia, Card, CardActions, CardContent, Button, CardHeader, Checkbox } from '@material-ui/core'
import Utility from 'src/utils/Utility';
import { CartAction } from 'src/stores/cart/cart.action';
import { useHistory } from "react-router-dom";
import defaultIcon from 'src/assets/icons/defaultIcon.png'
import DeleteIcon from '@material-ui/icons/Delete';
import AlertModal from './alertModal';
import ModalConfirm from './modal-confirm';
import { PaymentAction } from 'src/stores/payment/payment.action';
import { GeneralAction } from 'src/stores/general/general.action';
import { BookAction } from 'src/stores/book/book.action';

const useStyles = makeStyles((theme) => ({
    cardActions: {
        justifyContent: 'center',
    },
    cardContent: {
        textAlign: 'center',
        paddingBottom: '16px !important',
    },
    btnBuy: {
        color: '#fff',
    },
    btnAddToCart: {
        color: '#fff',
    },
    boxAmountProduct: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputAmountProduct: {
        width: '40px',
        height: '40px',
        textAlign: 'center',
        borderWidth: '1px',
        borderStyle: 'solid',
    },
    btnAmountProduct: {
        color: '#000',
        backgroundColor: '#dbdbdb',
        minWidth: 'auto',
        width: '40px',
        borderRadius: 0,
        fontWeight: 'bold',
        height: '40px',
        border: '1px solid transparent',
        fontSize: '22px',
        cursor: 'pointer',
        '&:disabled': {
            color: 'rgba(0, 0, 0, 0.26) !important',
        }
    },
    textPriceProduct: {
        color: '#B42D2D !important',
        fontWeight: 'bold',
        textAlign: 'right',
        width: '50%',
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden",
        fontSize: '13px',
    },
    textAmountProduct: {
        fontWeight: 'bold',
        textAlign: 'left',
        width: '50%',
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden",
        fontSize: '13px',
    },
    boxInputAmountProduct: {
        minWidth: '125px',
        display: 'flex',
        justifyContent: 'center',
    },
    textBookName: {
        fontWeight: 'bold',
        marginBottom: '16px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    textBookDescription: {
        marginBottom: '16px',
    },
    media: {
        height: '200px',
        objectFit: 'contain',
        cursor: 'pointer',
    },
    mediaDetail: {
        height: '400px',
        objectFit: 'contain',
        cursor: 'pointer',
    },
    cardHeader: {
        padding: 0,
        '& .MuiCardHeader-action': {
            width: '100%',
        }
    },
    boxCardHeader: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconTrash: {
        marginLeft: '-8px',
        cursor: 'pointer',
        color: '#B42D2D',
    },
    boxAmountPayment: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}))

const CardItem = (props: any) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { book_detail, isDetail=false, isAction=false, isCart=false, isPayment=false, isHistory=false, cart, handleSelectProduct, handleRemoveSelectProduct, selectProduct, calTotal } = props
    const [amount, setAmount] = useState(1)
    const [modalAlert, setModalAlert] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const authenStore = useSelector((state: IStates) => state.authenReducer);
    const cartStore = useSelector((state: IStates) => state.cartReducer);
    const [msgAlert, setMsgAlert] = useState('');

    const handleIncAmountProduct = () => {
        setAmount(amount+1);
    }

    const handleDecAmountProduct = () => {
        setAmount(amount-1);
    }

    const onClickBuy = () => {
        if(authenStore.isLoggedIn) {
            dispatch(
                ActionSaga({ 
                    type: BookAction.BOOK_DETAIL_R,
                    payload: {'book_id': book_detail.id},
                    onSuccess: (response: any) => {
                        if(amount <= response.amount) {
                            var list = [];
                            list.push({ 'amount': amount, 'book': book_detail });
                            var total = amount * book_detail.price;
                            var data = {'total': total, list: list}
                            dispatch(
                                ActionSaga({ 
                                    type: PaymentAction.PAYMENT_LIST_S,
                                    payload: data,
                                })
                            )
                            history.push('/payment');
                        }else {
                            setMsgAlert('จำนวนสินค้าคงเหลือไม่เพียงพอ');
                            setModalAlert(true);
                        }
                    },
                })
            )
        }else {
            dispatch(
                ActionSaga({ 
                  type: GeneralAction.SET_MODAL_LOGIN_S,
                  payload: {'isOpen': true},
                })
            )
        }
    }

    const onClickAddToCart = () => {
        if(authenStore.isLoggedIn) {
            dispatch(
                ActionSaga({ 
                    type: BookAction.BOOK_DETAIL_R,
                    payload: {'book_id': book_detail.id},
                    onSuccess: (response: any) => {
                        var cart_store = cartStore.list.filter((k:any) => k.book.id == book_detail.id);
                        var total_amount = amount;
                        if(cart_store.length > 0) {
                            total_amount += cart_store[0].amount
                        }
                        if(total_amount <= response.amount) {
                            var data = { 'book_id': book_detail.id, 'amount': amount, type: 'add' }
                            dispatch(
                                ActionSaga({ 
                                    type: CartAction.ADD_TO_CART_R,
                                    payload: data,
                                    onSuccess: () => {
                                    history.push('/cart');
                                    },
                                })
                            )
                        }else {
                            setMsgAlert('จำนวนสินค้าคงเหลือไม่เพียงพอ โปรดตรวจสอบตะกร้าสินค้า');
                            setModalAlert(true);
                        }
                    },
                })
            )
        }else {
            dispatch(
                ActionSaga({ 
                type: GeneralAction.SET_MODAL_LOGIN_S,
                payload: {'isOpen': true},
                })
            )
        }
    }

    const handleUpdateDecAmountProduct = () => {
        var data = { 'book_id': book_detail.id, 'amount': 1, type: 'remove' }
        dispatch(
            ActionSaga({ 
                type: CartAction.ADD_TO_CART_R,
                payload: data,
                onSuccess: (response: any) => {
                  calTotal(selectProduct, response);
                },
            })
        )
    }

    const handleUpdateIncAmountProduct = () => {
        var data = { 'book_id': book_detail.id, 'amount': 1, type: 'add' }
        dispatch(
            ActionSaga({ 
                type: CartAction.ADD_TO_CART_R,
                payload: data,
                onSuccess: (response: any) => {
                  calTotal(selectProduct, response);
                },
            })
        )
    }

    const delProductCart = () => {
        setModalConfirm(true);
    }

    const handleConfirmRemoveProductCart = () => {
        var data = { 'cart_id': cart.id }
        dispatch(
            ActionSaga({ 
                type: CartAction.REMOVE_CART_R,
                payload: data,
                onSuccess: () => {
                    handleRemoveSelectProduct(cart.id);
                    setModalConfirm(false);
                },
            })
        )
    }

    return (
        <>
            <Card>
                {isCart &&
                    <CardHeader
                        className={classes.cardHeader}
                        action={
                            <Box className={classes.boxCardHeader}>
                                <DeleteIcon className={classes.iconTrash} onClick={delProductCart}/>
                                <Checkbox 
                                    checked={selectProduct.filter((k:any) => k.id == cart.id).length > 0 ? true: false}
                                    onChange={handleSelectProduct}
                                    color="primary"
                                    value={cart.id}
                                />
                            </Box>
                        }
                    />
                }
                <CardContent className={classes.cardContent}>
                    <img className={isDetail ? classes.mediaDetail: classes.media} onClick={()=>{history.push(`/book/${book_detail.id}`)}} src={book_detail.img ? book_detail.img : defaultIcon}/>
                    <Typography className={classes.textBookName}>
                        {book_detail.name}
                    </Typography>
                    {isDetail &&
                        <Typography className={classes.textBookDescription}>
                            {book_detail.description}
                        </Typography>
                    }
                    {isPayment ?
                        <Box>
                            <Box className={classes.boxAmountPayment}>
                                <Typography>จำนวน</Typography>
                                <Typography>{cart.amount} ชิ้น</Typography>
                            </Box>
                            <Box className={classes.boxAmountPayment}>
                                <Typography>ราคา</Typography>
                                <Typography>{Utility.priceFormat(cart.amount * book_detail.price)} บาท</Typography>
                            </Box>
                        </Box>
                    :isHistory ?
                        <Box>
                            <Box className={classes.boxAmountPayment}>
                                <Typography>จำนวน</Typography>
                                <Typography>{book_detail.amount} ชิ้น</Typography>
                            </Box>
                            <Box className={classes.boxAmountPayment}>
                                <Typography>ราคา</Typography>
                                <Typography>{Utility.priceFormat(book_detail.amount * book_detail.price)} บาท</Typography>
                            </Box>
                        </Box>
                    :
                        <Box className={classes.boxAmountProduct}>
                            <p className={classes.textAmountProduct}>สินค้าคงเหลือ {Utility.numberFormat(book_detail.amount)} ชิ้น</p>
                            {isCart ?
                                <Box className={classes.boxInputAmountProduct}>
                                    <button 
                                        className={classes.btnAmountProduct} 
                                        onClick={()=>handleUpdateDecAmountProduct()} 
                                        disabled={cart.amount === 1 ? true: false}
                                    >
                                        -
                                    </button>
                                    <input
                                        readOnly
                                        className={classes.inputAmountProduct}
                                        disabled
                                        value={cart.amount}
                                    />
                                    <button 
                                        className={classes.btnAmountProduct} 
                                        onClick={()=>handleUpdateIncAmountProduct()} 
                                        disabled={cart.amount >= book_detail.amount ? true: false}
                                    >
                                        +
                                    </button>
                                </Box>
                            :
                                <Box className={classes.boxInputAmountProduct}>
                                    <button 
                                        className={classes.btnAmountProduct} 
                                        onClick={()=>handleDecAmountProduct()} 
                                        disabled={amount === 1 ? true: false}
                                    >
                                        -
                                    </button>
                                    <input
                                        readOnly
                                        className={classes.inputAmountProduct}
                                        disabled
                                        value={amount}
                                    />
                                    <button 
                                        className={classes.btnAmountProduct} 
                                        onClick={()=>handleIncAmountProduct()} 
                                        disabled={amount >= book_detail.amount ? true: false}
                                    >
                                        +
                                    </button>
                                </Box>
                            }
                            <p className={classes.textPriceProduct}>{Utility.priceFormat(book_detail.price)} บาท</p>
                        </Box>
                    }
                </CardContent>
                {isAction &&
                    <CardActions className={classes.cardActions}>
                        <Button variant="contained" color='primary' className={classes.btnBuy} onClick={()=>onClickBuy()}>ซื้อ</Button>
                        <Button variant="contained" color='secondary' className={classes.btnAddToCart} onClick={()=>onClickAddToCart()}>เพิ่มลงรถเข็น</Button>
                    </CardActions>
                }
            </Card>
            <ModalConfirm
                open={modalConfirm}
                title="ลบรายการสินค้า"
                text="ยืนยันการลบรายการสินค้าในตะกร้า"
                onClose={() => setModalConfirm(false)}
                onSubmit={handleConfirmRemoveProductCart}
            />
            <AlertModal
                open={modalAlert}
                onClose={() => setModalAlert(false)}
                title="แจ้งเตือน!"
                text={msgAlert}
                titleButton="รับทราบ"
            />
        </>
    )
}

export default CardItem
