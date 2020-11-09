import React from 'react';
import { Route } from 'react-router-dom'

import './styles.css'

function DefaultLayout({ component: Component, ...props }) {
  return (
    <Route 
      {...props} 
      render={ (routeProps) =>(
        <>
          <div className="main">
            <Component {...routeProps}/>
          </div>
        </>
        )} 
    />
  );
}

export default DefaultLayout;
