import React from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 101,
      color: '#fff',
    },
  }),
);
const LoadingScreen = () => {
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={true} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default LoadingScreen
