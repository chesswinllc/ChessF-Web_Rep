import * as React from 'react';
import { Route, Redirect } from 'react-router';

export interface IPublicRouteProps {
    auth: boolean,
    component: any,
    exact: boolean,
    path: string
}

export default class PublicRoute extends React.Component<IPublicRouteProps, any> {
    public render() {

        const { auth, exact, path, component } = this.props;


        if (auth) {
            return <Redirect to='/' />
        }

        return <Route exact={exact} path={path} component={component} />
    }
}
