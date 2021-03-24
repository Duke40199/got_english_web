import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { Component } from 'react';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const isAuthenticated = () => {
  const loggedUser = localStorage.getItem('user');
  if (loggedUser != null) {
    return true;
  } else return false;
}


const UnauthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);


const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            {
              isAuthenticated ?
                <AuthenticatedRoute exact path="/" name="Dashboard" component={TheLayout} /> :
                <UnauthenticatedRoute exact path="/" name="Home" component={Login} />
            }
            <UnauthenticatedRoute path="/login" name="Login Page" component={Login} />
            <UnauthenticatedRoute path="/register" name="Register Page" component={Register} />
            {
              isAuthenticated ?
                <AuthenticatedRoute path="*" name="Dashboard" component={TheLayout} /> :
                <UnauthenticatedRoute path="*" name="Page 404" component={Page404} />
            }
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
