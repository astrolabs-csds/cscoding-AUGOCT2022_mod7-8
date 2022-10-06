import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import RegistrationScreen from "./RegistrationScreen";
import LayoutRoute from './LayoutRoute';

function App() {
  return (
      <BrowserRouter>
          <Switch>
            <LayoutRoute path="/" component={HomeScreen} exact={true} />
            <LayoutRoute path="/about" component={AboutScreen} exact={true} />
            <LayoutRoute path="/registration" component={RegistrationScreen} exact={true} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;