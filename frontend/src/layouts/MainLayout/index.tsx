import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import TopBar from './TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralAction } from 'src/stores/general/general.action';
import { ActionSaga } from 'src/services/action.saga';
import { LoadingScreen } from 'src/components';
import { IStates } from 'src/stores/root.reducer';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}));

interface IDashboardLayout {
  children: JSX.Element;
}
function DashboardLayout(props: IDashboardLayout) {
  const { children } = props;
  const classes = useStyles();
  const refContent = useRef(null);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content} ref={refContent}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
