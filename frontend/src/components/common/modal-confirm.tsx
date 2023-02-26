import React from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Button, Typography, makeStyles } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';

interface IModal {
    open?: boolean
    onSubmit?: () => void
    onClose?: () => void
    title?: string
    text?: string
    alerttext?: string
    titleButton?: string
    disableButtonSubmit?: boolean | undefined
    maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    boxDialog: {
        textAlign: 'center',
        '& .MuiTypography-h6': {
            color: '#b51415',
            fontSize: '18px',
            lineHeight: '13px'
        },
        '& p': {
            fontSize: '16px',
        },
        '& .spanText': {
            fontWeight: 'bold'
        }
    },
    dialogAction: {
        justifyContent: 'center',
    },
    contentText: {
        color: '#d95152',
        fontSize: '13px !important',
    }
}))

const ModalConfirm = (props: IModal) => {
    const classes = useStyles()
    const { open=false, onClose, onSubmit, title=null, text=null, titleButton=null, disableButtonSubmit=false, maxWidth='xs',alerttext=null } = props

    return (
        <Dialog
            className={classes.boxDialog}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            maxWidth={maxWidth}
            fullWidth={true}
            onClose={onClose}
        >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText className="contentText" id="alert-dialog-slide-description">
                {text}
              </DialogContentText>
              {alerttext!=null&&
                <DialogContentText className={classes.contentText} id="alert-dialog-slide-description">
                {alerttext}
              </DialogContentText>}
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button onClick={onClose} color="default" variant="contained">
                    ยกเลิก
                </Button>
                <Button onClick={onSubmit} color="primary" variant="contained" disabled={disableButtonSubmit}>
                    ยืนยัน
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalConfirm