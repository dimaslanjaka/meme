import React from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from './Loader';

class Layout extends React.Component {
  render() {
    return (
      <React.Suspense fallback={<Spinner />}>
        <Outlet />
      </React.Suspense>
    );
  }
}

export default Layout;
