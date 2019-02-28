import * as React from 'react';
import { Route, Redirect } from 'react-router';

export interface IPrivateRouteProps {
    auth: boolean,
    component: any,
    exact: boolean,
    path: string
}

export default class PrivateRoute extends React.Component<IPrivateRouteProps, any> {
    public render() {

        const { auth, exact, path, component } = this.props;


        if (!auth) {
            return <Redirect to='/login' />
        }

        return <Route exact={exact} path={path} component={component} />
    }
}
