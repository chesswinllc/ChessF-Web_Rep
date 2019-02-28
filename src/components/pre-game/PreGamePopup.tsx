import * as React from 'react';
import { connect } from 'react-redux';
import GameRequestSent from './GameRequestSent';
import { GameActionTypes } from 'src/redux/actions/GameActionTypes';
import { IReduxStore } from 'src/redux';
import PreGame from 'src/model/PreGame';
import NewGameRequest from './NewGameRequest';
import GameRequestDeclined from './GameRequestDeclined';
import { Action } from 'redux';
import GameRequestAccepted from './GameRequestAccepted';
import GameAborted from './GameAborted';
import NewDrawRequest from './NewDrawRequest';
import DrawRequestSent from './DrawRequestSent';
import DrawRequestDeclined from './DrawRequestDeclined';
import DrawRequestAccepted from './DrawRequestAccepted';


export interface IPreGamePopupProps {
    preGame: PreGame,
    dispatch: (action: Action) => any
}


const PreGamePopup = class extends React.Component<IPreGamePopupProps, any> {


    public render() {

        const { preGame } = this.props;


        switch (preGame.status) {
            case GameActionTypes.GAME_REQUEST_SEND:
                return <GameRequestSent dispatch={this.props.dispatch} />;
            case GameActionTypes.NEW_GAME_REQUEST:
                return <NewGameRequest payload={this.props.preGame.payload} user={this.props.preGame.user} dispatch={this.props.dispatch} />
            case GameActionTypes.GAME_REQUEST_DECLINED:
                return <GameRequestDeclined payload={this.props.preGame.payload} user={this.props.preGame.user} dispatch={this.props.dispatch} />
            case GameActionTypes.GAME_REQUEST_ACCEPTED:
                return <GameRequestAccepted preGame={this.props.preGame} />
            case GameActionTypes.GAME_ABORTED_POPUP:
                return <GameAborted user={this.props.preGame.user} dispatch={this.props.dispatch} />
            case GameActionTypes.DRAW_REQUEST_SENT:
                return <DrawRequestSent />
            case GameActionTypes.DRAW_REQUEST:
                return <NewDrawRequest />
            case GameActionTypes.DRAW_REQUEST_DECLINE:
                return <DrawRequestDeclined dispatch={this.props.dispatch} />
            case GameActionTypes.DRAW_REQUEST_ACCEPT:
                return <DrawRequestAccepted dispatch={this.props.dispatch} />
            default:
                return <div />
        }

    }


}


const mapStateToProps = (state: IReduxStore) => {
    return {
        preGame: state.preGame,
    }
}


export default connect(mapStateToProps)(PreGamePopup);