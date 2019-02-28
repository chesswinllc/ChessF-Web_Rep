import * as React from 'react';
import Sidebar from 'src/components/home/Siderbar';
import Content from '../../components/home/Content';
import { Route, Switch } from 'react-router';
import Conversion from 'src/components/home/Conversion';
import User from 'src/model/User';
import PreGamePopup from 'src/components/pre-game/PreGamePopup';
import ConfirmDialog from 'src/components/ConfirmDialog';


export interface IHomeProps {
    user: User
}

export default class Home extends React.Component<IHomeProps, any> {


    public render() {

        return (
            <div className='home'>
                <PreGamePopup />
                <ConfirmDialog />
                <Sidebar />

                <Switch>
                    <Route exact path={'/game'} component={Content} />
                    <Route component={Conversion} />
                </Switch>
            </div>
        );
    }
}
