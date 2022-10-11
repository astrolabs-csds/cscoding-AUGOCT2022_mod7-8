import { useEffect, useContext } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom';
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ProfileScreen from "./ProfileScreen";
import RegistrationScreen from "./RegistrationScreen";
import LayoutRoute from './LayoutRoute';
import LoginScreen from './LoginScreen';

import {UserContext} from './UserContext';

function App() {

  const { updateUser } = useContext(UserContext);

  useEffect(
    function() {
      // fetch function
      fetch(`http://localhost:3001/users/find`,{
        "method": 'POST',
        "headers": {
            //"Content-Type": "multipart/form-data"
            'Authorization' : `Bearer ${localStorage.getItem('jsonwebtoken')}`,
        }
      })
      // Convert the JSON string to an object
      .then(
          (response) => response.json()
      )

      // If Promise was successful
      .then(
          (response) => {
              console.log(response);
              
              // Turn off preloader and reveal success message
              updateUser(
                {
                  firstName: response.message.firstName,
                  lastName: response.message.lastName,
                  email: response.message.email,
                  password: response.message.password,
                  avatar: response.message.avatar,
                  phone: response.message.phone
                }
              )
          }
      )

      // If Promise was not fulfilled
      .catch(
          (e) => {
              console.log({e: e})
              // Turn off preloader and reveal error message
          }
      )
    }, []
  )

  return (
      <BrowserRouter>
          <Switch>
            <LayoutRoute path="/" component={HomeScreen} exact={true} />
            <LayoutRoute path="/about" component={AboutScreen} exact={true} />
            <LayoutRoute path="/profile" component={ProfileScreen} exact={true} />
            <LayoutRoute path="/registration" component={RegistrationScreen} exact={true} />
            <LayoutRoute path="/login" component={LoginScreen} exact={true} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;