import React from 'react';
import { Page, PageHeader } from 'src/components';
import { makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
  root: {
    minHeight: '100%',
    paddingTop: '24px',
    paddingBottom: '24px',
  },
  rootHeader: {
    minHeight: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  }
}));

interface IPageContainer {
  children?: any;
  title?: any;
  header? : string;
}
const PageContainer = (props: IPageContainer) => {
  const classes = useStyles();  
  const { header } = props
  
  return (
    <Page className={header? classes.rootHeader: classes.root}>
      {header &&
        <PageHeader
            title={header}
        />
      }
      <Container maxWidth="xl">
        {props.children}
      </Container>
    </Page>
  );
};

export default PageContainer;
