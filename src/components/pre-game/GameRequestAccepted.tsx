import * as React from 'react';
// import { Action } from 'redux';
// import { closePreGamePopup } from 'src/redux/actions/ActionCreators';
import Loader from '../common/Loader';
import { subscribeGame } from 'src/services/GameService';
import PreGame from 'src/model/PreGame';

export interface IGameRequestAcceptedProps {
    preGame: PreGame
}

export default class GameRequestAccepted extends React.Component<IGameRequestAcceptedProps, any> {


    componentWillMount() {
        subscribeGame(this.props.preGame);
    }


    public render() {
        return (
            <div className='popup popup__content-center'>
                <div className='popup__name mrb-10px'>Starting game</div>
                <Loader color='rgb(0,143,69)' width={30} height={30} />
            </div>
        );
    }

}

