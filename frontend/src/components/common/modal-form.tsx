import React from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, makeStyles, Typography, CircularProgress, Box, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    btnSave: {
        color: '#0f6119',
        border: '2px solid #0f6119',
        backgroundColor: '#ffffff',
        lineHeight: '1.5',
        '&:disabled':{
            border: '2px solid #e0e0e0',
        }
    },
    btnCancel:{
        color: '#aa0c0e',
        border: '2px solid #aa0c0e',
        backgroundColor: '#ffffff',
        '&:disabled':{
            border: '2px solid #e0e0e0',
        }
    },
    dialogContent: {
        padding: '8px 22px'
    },
    dialogTitle: {
        color: '#000000',
        padding: '22px'
    },
    dialogAction: {
        padding: '22px',
        justifyContent: 'center',
        textAlign: 'center'
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: '22px',
        color: theme.palette.grey[500],
    },
    dialogContainer: {
        '& .MuiPaper-root': {
            padding: 0
        }
    },
    gridDialogAction: {
        justifyContent: 'center',
        [theme.breakpoints.down(600)]: {
            flexDirection: 'column-reverse'
        },
    },
}))

const ModalForm = (props: any) => {
    const classes = useStyles()
    const { open=false, onClose, onSubmit, isSubmit=false, isCancel=false, disableButtonSubmit=false, title=null, children=null, titleBtnSubmit='ยืนยัน', titleButtonCancel='ยกเลิก', maxWidth='xs' } = props
    
    return (
        <Dialog
            className={classes.dialogContainer}
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            maxWidth={maxWidth}
            fullWidth={true}
        >
            <DialogTitle className={classes.dialogTitle}>
                <Typography variant="h4">
                    {title}
                </Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            {
                children &&
                <DialogContent className={classes.dialogContent}>
                    {children}
                </DialogContent>
            }
            <DialogActions className={classes.dialogAction}>
                {
                    isCancel &&
                    <Button onClick={onClose} className={classes.btnCancel} variant="contained">
                        {titleButtonCancel}
                    </Button>
                }
                {
                    isSubmit &&
                    <Grid container className={classes.gridDialogAction}>
                        <Grid item xs={12}>
                            <Button onClick={onSubmit} className={classes.btnSave} disabled={disableButtonSubmit}  variant="contained">
                                {titleBtnSubmit}
                            </Button>
                        </Grid>
                    </Grid>
                }
            </DialogActions>
        </Dialog>
    )
}

export default ModalForm