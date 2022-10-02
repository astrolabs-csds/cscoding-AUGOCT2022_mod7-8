import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";

function App() {
  return (
      <BrowserRouter>
          <Switch>
            <Route path="/" component={HomeScreen} exact={true} />
            <Route path="/about" component={AboutScreen} exact={true} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;