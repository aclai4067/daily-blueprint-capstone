import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import MyNav from '../components/shared/MyNav/MyNav';
import Home from '../components/pages/Home/Home';
import Login from '../components/pages/Login/Login';
import Pomodoro from '../components/pages/Pomodoro/Pomodoro';
import Team from '../components/pages/Team/Team';
import './App.scss';
import authData from '../helpers/data/authData';
import userData from '../helpers/data/userData';

authData.firebaseApp();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    user: {},
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        userData.getUserByFirebaseUid(user.uid)
          .then((result) => this.setState({ user: result.data }))
          .catch((errorGettingUserOnApp) => console.error(errorGettingUserOnApp));
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, user } = this.state;

    return (
      <div className="App">
        <Router>
          <MyNav authed={authed} />
          <Switch>
            <PublicRoute path="/login" exact component={() => <Login />} authed={authed} />
            <PrivateRoute path="/" exact component={() => <Home user={user} />} authed={authed} />
            <PrivateRoute path="/team" exact component={() => <Team />} authed={authed} />
            <PrivateRoute path="/pomodoro" exact component={() => <Pomodoro />} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
