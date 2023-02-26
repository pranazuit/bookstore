import { lazy } from 'react';
import routeLink from './route-link';
import React from 'react';
import { Redirect } from 'react-router';
import GA from './guard.authen';

const exact = true;

export default [
    { exact, path: routeLink.bookstore.home, component: lazy(() => import('src/views/home')) },
    { exact, path: routeLink.bookstore.bookdetail, component: lazy(() => import('src/views/book_detail')) },
    { exact, path: routeLink.bookstore.cart, component: lazy(() => import('src/views/cart')), guard: GA },
    { exact, path: routeLink.bookstore.history, component: lazy(() => import('src/views/history')), guard: GA },
    { exact, path: routeLink.bookstore.payment, component: lazy(() => import('src/views/payment')), guard: GA },
    { component: () => <Redirect to={routeLink.error404} /> },
]