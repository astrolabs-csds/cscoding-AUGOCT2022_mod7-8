import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppBar from './AppBar.js';
import Footer from './Footer.js';
import { UserContext } from './UserContext.js';

function PrivateLayoutRoute(props) {

    var { jsonwebtoken } = useContext( UserContext )

    if (jsonwebtoken) { 
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
    } else {
        return (
            <Redirect to="/"/>
        )
    }
}

export default PrivateLayoutRoute;