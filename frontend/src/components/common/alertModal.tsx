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
    }
}))

const AlertModal = (props: IModal) => {
    const classes = useStyles()
    const { open=false, onClose, onSubmit, title=null, text=null, titleButton=null, disableButtonSubmit=false, maxWidth='xs' } = props

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
        >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText className="contentText" id="alert-dialog-slide-description">
                {text}
              </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button onClick={onClose} color="primary" variant="contained">
                    {titleButton}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertModal