import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Home from '../components/pages/Home/Home';
import Login from '../components/pages/Login/Login';
import Pomodoro from '../components/pages/Pomodoro/Pomodoro';
import Team from '../components/pages/Team/Team';
import './App.scss';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  };

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" exact component={() => <Login />} />
            <PrivateRoute path="/" exact component={() => <Home />} authed={authed} />
            <PrivateRoute path="/team" exact component={() => <Team />} authed={authed} />
            <PrivateRoute path="/pomodoro" exact component={() => <Pomodoro />} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
