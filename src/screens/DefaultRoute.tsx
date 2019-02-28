import * as React from 'react';
import { Route } from 'react-router';
import Routes from './';
import User from 'src/model/User';
import WebSocketClient from 'src/services/WebSocketClient';

export interface IDefaultRouteProps {
    auth: boolean,
    user: User
}

export default class DefaultRoute extends React.Component<IDefaultRouteProps, any> {
    componentDidMount() {
        if (this.props.auth) {
            WebSocketClient.getInstance().open(this.props.user.id || '');
        }
    }

    componentDidUpdate(prevProps: IDefaultRouteProps, prevState: any) {
        if (prevProps.auth && !this.props.auth) {
            WebSocketClient.getInstance().close()
        }
    }

    public render() {

        const { auth, user } = this.props;

        return <Route user={user} component={auth ? Routes.PrivateRoutes.Home : Routes.PublicRoutes.Home} />

    }
}
