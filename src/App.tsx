import * as React from 'react';
import Routes from './screens';
import { Switch } from 'react-router';
import DefaultRoute from './screens/DefaultRoute';
import { logoutUser, initCognitoIdentyPool } from './services/CognitoServices';


interface IAppProps {
  store: any,
}

class App extends React.Component<IAppProps, any> {

  public componentWillMount() {
    initCognitoIdentyPool();
  }

  componentWillUnmount() {
    logoutUser();
  }

  public render() {
    const { user } = this.props.store.getState();

    const auth = user.id ? true : false;


    return (
      <Switch>
        <Routes.PublicRoute auth={auth} exact path='/reset-confirm' component={Routes.PublicRoutes.ConfirmPW} />
        <Routes.PublicRoute auth={auth} exact path='/reset' component={Routes.PublicRoutes.Reset} />
        <Routes.PublicRoute auth={auth} exact path='/login' component={Routes.PublicRoutes.Login} />
        <DefaultRoute auth={auth} user={user} />
      </Switch>
    )

  }
}


export default App;
