import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/layouts/auth';
import DefaultLayout from '~/pages/layouts/default';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />{' '}
        </Layout>
      )}
    />
  );
}
