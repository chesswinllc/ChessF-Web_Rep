import * as React from 'react';
import Loader from '../common/Loader';
import { Action } from 'redux';
import { closePreGamePopup } from 'src/redux/actions/ActionCreators';

export interface IGameRequestSentProps {
    dispatch: (action: Action) => any
}

export default class GameRequestSent extends React.Component<IGameRequestSentProps, any> {

    private timeout: any;

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.props.dispatch(closePreGamePopup());
        }, 30000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }


    public render() {
        return (
            <div className='popup popup__content-center'>
                <div className='popup__name mrb-10px'>Waiting for opponent</div>
                <Loader color='rgb(0,143,69)' width={30} height={30} />
            </div>
        );
    }
}
