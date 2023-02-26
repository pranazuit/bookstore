import React, { lazy } from 'react';
import LA from 'src/layouts/MainLayout'
import routesApp from './route-layout-app';
import GA from './guard.authen';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Crypto from 'src/services/crypto';
import { IStates } from 'src/stores/root.reducer';
import routeLink from './route-link';

const exact = true;

interface IToModule {
  url: string;
}
export const ToModule = (props: IToModule) => {
  const { token } = useSelector((state: IStates) => state.authenReducer);
  const tokenEncrypt = Crypto.encrypt(`${token}`);
  setTimeout(() => {
    window.location.href = window.encodeURI(`${props.url}?i=${tokenEncrypt}`);
  }, 500);
  return <div>Redirecting...</div>;
};

export default [
  { exact, path: routeLink.logout, component: lazy(() => import('src/pages/logout')), guard: GA },
  { exact, path: routeLink.error404, component: lazy(() => import('src/pages/error/error-404')) },
  { exact, path: routeLink.error403, component: lazy(() => import('src/pages/error/error-403')) },
  { path: routeLink.bookstore, routes: [...routesApp], layout: LA },
  { component: () => <Redirect to={routeLink.error404} /> },
];
