import React from 'react';
import { Route } from 'react-router-dom';
import AppBar from './AppBar.js';
import Footer from './Footer.js';

function LayoutRoute(props) {
    return (
        <React.Fragment>

            <AppBar/>
            <Route 
                path={props.path} 
                exact={props.exact} 
                component={props.component}
            />
            <Footer />

        </React.Fragment>
    )
}

export default LayoutRoute;