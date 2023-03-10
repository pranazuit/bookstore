import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AppBar, Box, Hidden, IconButton, Toolbar, makeStyles, SvgIcon, Button, TextField, Menu, MenuItem, Typography } from '@material-ui/core';
import { ModalForm } from 'src/components/common';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { ActionSaga } from 'src/services/action.saga'
import { ActionReducer } from 'src/services/action.reducer';
import { IStates } from 'src/stores/root.reducer';
import { AuthenAction } from 'src/stores/authen/authen.action';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HistoryIcon from '@material-ui/icons/History';
import { CartAction } from 'src/stores/cart/cart.action';
import { useHistory } from "react-router-dom";
import { GeneralAction } from 'src/stores/general/general.action';

const useStyles = makeStyles((theme: any) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    padding: 0
  },
  toolbar: {
    minHeight: '65px',
    justifyContent: 'space-between',
  },
  logo: {
    '& a':{
      color: '#fff',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      textDecoration: 'none',
    } ,
    '& > *':{
      display: 'flex'
    },
    '& span': {
      borderRadius: '100%',
      width: '60px',
      height: '60px',
      display: 'flex',
      padding: '8px',
      marginRight: '10px',
      '& img': {
        maxHeight : '55px',
        maxWidth: '100%'
      }
    },
    '& strong':{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      fontSize: '26px',
      lineHeight:'30px'
    }
  },
  btnLogin: {
    marginRight: '10px',
    backgroundColor: '#0655EA !important',
    color: '#fff',
  },
  btnRegister: {
    backgroundColor: '#B51415 !important',
    color: '#fff',
  },
  inputBooking: {
    marginBottom: '18px',
  },
  boxBtnModal: {
    textAlign: 'center',
  },
  paper: {
    padding: 0,
    '& .MuiList-padding': {
      padding: 0
    }
  },
  menuIcon: {
    color: '#fff',
    cursor: 'pointer',
  },
  cartIcon: {
    color: '#fff',
    marginRight: '10px',
    cursor: 'pointer',
  },
  boxCartMenu: {
    display: 'flex',
  },
  counterNotification: {
    position: 'absolute',
    top: '12px',
    right: '52px',
    backgroundColor: 'red',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
  },
  textCounterNotification: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '11px',
    textAlign: 'center'
  },
  msgError: {
    marginTop: '18px',
    color: 'red',
    textAlign: 'center',
  },
  helpMessage: {
    fontSize: '12px',
    margin: '8px 0px',
    color: '#979797',
  }
}));

const Logo = () => {  
  return (
    <>
      <span><img alt="logo"  src={`${process.env.PUBLIC_URL}/static/logo.png`} /></span>
      <strong>Book Store</strong>
    </>
  )
};

function TopBar(propx: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { className, ...rest } = propx;
  const classes: any = useStyles();
  const authenStore = useSelector((state: IStates) => state.authenReducer);
  const cartStore = useSelector((state: IStates) => state.cartReducer);
  const generalStore = useSelector((state: IStates) => state.generalReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const [msgError, setMsgError] = useState('');

  useEffect(() => {
    if(authenStore.isLoggedIn) {
      dispatch(
        ActionSaga({ 
            type: CartAction.CART_LIST_R,
        })
      )
    }
  }, [dispatch])

  const onClickLogin = () => {
    dispatch(
      ActionSaga({ 
        type: GeneralAction.SET_MODAL_LOGIN_S,
        payload: {'isOpen': true},
      })
    )
  }

  const onClickRegister = () => {
    dispatch(
      ActionSaga({ 
        type: GeneralAction.SET_MODAL_REGISTER_S,
        payload: {'isOpen': true},
      })
    )
  }

  const formikLogin = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required("*???????????????????????????????????????????????????"),
      password: yup.string().required("*???????????????????????????????????????????????????"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      setMsgError('');
      dispatch(
        ActionSaga({ 
            type: AuthenAction.AUTHEN_LOGIN_R,
            payload: values,
            onSuccess: () => {
              dispatch(
                ActionSaga({ 
                  type: GeneralAction.SET_MODAL_LOGIN_S,
                  payload: {'isOpen': false},
                })
              )
              formikLogin.resetForm();
              dispatch(
                ActionSaga({ 
                    type: CartAction.CART_LIST_R,
                })
              )
            },
            onFailure: (err: any) => {
              setMsgError(err.message);
            }
        })
      )
    }
  })

  const validateRegister = yup.object().shape({
    username: yup
    .string()
    .required('????????????????????????????????????????????????')
    .matches(/^([a-zA-Z0-9._-]){0,50}@([a-zA-Z0-9._-]+)\.([a-zA-Z0-9._-]+)$/,"?????????????????????????????????????????????????????????????????????"),
    password: yup
    .string()
    .required('???????????????????????????????????????????????????')
    .min(8, '????????????????????????????????????????????????????????????????????????')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"????????????????????????????????????????????????????????????????????????"),
    confirm_password: yup
    .string()
    .required('?????????????????????????????????????????????????????????')
    .oneOf([yup.ref("password"), null], "???????????????????????????????????????????????????")
  })

  const formikRegister = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: validateRegister,
    validateOnChange: false,
    onSubmit: (values) => {
      setMsgError('');
      dispatch(
        ActionSaga({ 
            type: AuthenAction.REGISTER_R,
            payload: values,
            onSuccess: () => {
              dispatch(
                ActionSaga({ 
                  type: GeneralAction.SET_MODAL_REGISTER_S,
                  payload: {'isOpen': false},
                })
              )
              formikRegister.resetForm();
            },
            onFailure: (err: any) => {
              setMsgError(err.username);
            }
        })
      )
    }
  })

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const onClickOpenMenu = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const onClickLogout = () => {
    dispatch(
      ActionSaga({ 
          type: AuthenAction.AUTHEN_LOGOUT_R,
          onSuccess: () => {
            setAnchorEl(null);
          },
      })
    )
  }

  const onClickCart = () => {
    history.push('/cart');
  }

  const onClickHistory = () => {
    setAnchorEl(null);
    history.push('/history');
  }

  return (
    <AppBar elevation={8} className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.logo}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
        {!authenStore.isLoggedIn ?
          <Box>
            <Button variant='contained' size='small' className={classes.btnLogin} onClick={onClickLogin}>?????????????????????????????????</Button>
            <Button variant='contained' size='small' className={classes.btnRegister} onClick={onClickRegister}>?????????????????????????????????</Button>
          </Box>
        :
          <Box className={classes.boxCartMenu}>
            <Box>
              <ShoppingCartIcon className={classes.cartIcon} onClick={onClickCart}/>
                {cartStore && cartStore.list.length > 0 ?
                  <Box className={classes.counterNotification}>
                    <Typography className={classes.textCounterNotification}>{cartStore.list.length}</Typography>
                  </Box>
                : null}
            </Box>
            <MenuIcon className={classes.menuIcon} onClick={onClickOpenMenu}/>
            <Menu
              classes={{ paper: classes.paper }}
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              getContentAnchorEl={null}
            >
              <MenuItem onClick={handleCloseMenu}><AccountCircleIcon/>&nbsp;{authenStore.username}</MenuItem>
              <MenuItem onClick={onClickHistory}><HistoryIcon/>&nbsp;??????????????????????????????????????????</MenuItem>
              <MenuItem onClick={onClickLogout}><ExitToAppIcon/>&nbsp;???????????????????????????</MenuItem>
            </Menu>
          </Box>
        }
      </Toolbar>
      <ModalForm 
        open={generalStore.modalLogin} 
        onClose={() => { 
          dispatch(
            ActionSaga({ 
              type: GeneralAction.SET_MODAL_LOGIN_S,
              payload: {'isOpen': false},
            })
          )
          formikLogin.resetForm();
          setMsgError('');
        }}
        isSubmit={true}
        onSubmit={formikLogin.handleSubmit}
        titleBtnSubmit='?????????????????????????????????'
        title='?????????????????????????????????'
      >
        <TextField
          className={classes.inputBooking}
          name="username"
          label="E-mail"
          variant="outlined"
          fullWidth
          value={formikLogin.values.username}
          onChange={formikLogin.handleChange}
          helperText={formikLogin.errors.username}
          error={Boolean(formikLogin.errors.username)}
        />
        <TextField
          name="password"
          label="????????????????????????"
          variant="outlined"
          type="password"
          fullWidth
          value={formikLogin.values.password}
          onChange={formikLogin.handleChange}
          helperText={formikLogin.errors.password}
          error={Boolean(formikLogin.errors.password)}
        />
        <Typography className={classes.msgError}>{msgError}</Typography>
      </ModalForm>
      <ModalForm 
        open={generalStore.modalRegister}
        onClose={() => { 
          dispatch(
            ActionSaga({ 
              type: GeneralAction.SET_MODAL_REGISTER_S,
              payload: {'isOpen': false},
            })
          )
          formikRegister.resetForm();
          setMsgError('');
        }}
        isSubmit={true}
        onSubmit={formikRegister.handleSubmit}
        titleBtnSubmit='?????????????????????????????????'
        title='?????????????????????????????????'
      >
        <TextField
          className={classes.inputBooking}
          name="username"
          label="E-mail"
          variant="outlined"
          fullWidth
          value={formikRegister.values.username}
          onChange={formikRegister.handleChange}
          helperText={formikRegister.errors.username}
          error={Boolean(formikRegister.errors.username)}
        />
        <TextField
          name="password"
          label="????????????????????????"
          variant="outlined"
          type="password"
          fullWidth
          value={formikRegister.values.password}
          onChange={formikRegister.handleChange}
          helperText={formikRegister.errors.password}
          error={Boolean(formikRegister.errors.password)}
        />
        <Typography className={classes.helpMessage}>- ?????????????????????????????????????????????????????? 8 ?????????</Typography>
        <Typography className={classes.helpMessage}>- ????????????????????????????????????????????????????????????????????????????????? 1 ?????????</Typography>
        <Typography className={classes.helpMessage}>- ????????????????????????????????????????????????????????????????????????????????? 1 ?????????</Typography>
        <Typography className={classes.helpMessage}>- ?????????????????? 1 ?????????</Typography>
        <Typography className={classes.helpMessage}>- ????????????????????????????????? 1 ?????????</Typography>
        <TextField
          name="confirm_password"
          label="??????????????????????????????????????????"
          variant="outlined"
          type="password"
          fullWidth
          value={formikRegister.values.confirm_password}
          onChange={formikRegister.handleChange}
          helperText={formikRegister.errors.confirm_password}
          error={Boolean(formikRegister.errors.confirm_password)}
        />
        <Typography className={classes.msgError}>{msgError}</Typography>
      </ModalForm>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
