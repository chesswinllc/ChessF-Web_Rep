import { Subject } from 'rxjs';
import User from 'src/model/User';
import { GameActionTypes } from 'src/redux/actions/GameActionTypes';
import { sendGameRequestLambda, declineGameRequestLambda, acceptGameRequestLambda, subscribeGameLambda, sendChatMessageLambda, newGameMoveLambda, abortGameLambda, sendDrawRequestLambda, unsubscribeGameLambda } from './LambdaServices';
import { store } from 'src/redux';
import { gameRequestAccepted, gameSubscribed, newGameMoveAction, gameAborted, closePreGamePopup } from 'src/redux/actions/ActionCreators';
import PreGame from 'src/model/PreGame';
import { push } from 'connected-react-router';

export const $GameObs = new Subject();

export const sendGameRequest = (currentUser: User, opponent: User, callback: () => void) => {

    sendGameRequestLambda(currentUser.id || '', opponent.id || '', (error: string, game: string) => {
        callback();
        if (!error) {
            store.dispatch({ type: GameActionTypes.GAME_REQUEST_SEND, payload: game, user: opponent });
            // $GameObs.next({ type: GameActionTypes.GAME_REQUEST_SEND, payload: game });
        } else {
            store.dispatch(closePreGamePopup());
        }
    })

}


export const declineGameRequest = (opponentId: string, gameId: string) => {
    store.dispatch({ type: GameActionTypes.CLOSE_PRE_GAME_POPUP });
    declineGameRequestLambda(opponentId, gameId, (error: string) => {

    })
}


export const acceptGameRequest = (game: any) => {

    acceptGameRequestLambda(game, (error: string) => {
        if (error) {
            store.dispatch(closePreGamePopup());
        } else {
            store.dispatch(gameRequestAccepted(game.id));
        }
    })
}


export const unsubscribeGame = (gameId: string, connectionId: string) => {
    unsubscribeGameLambda(gameId, connectionId, (error: string) => {

    })
}


export const reSubscribeGame = (gameId: string, connectionId: string) => {
    subscribeGameLambda(gameId, connectionId, (error: string) => {

    })
}


let subscribeTried = 0;
export const subscribeGame = (preGame: PreGame) => {
    const connectionId = store.getState().connectionId;
    const currentUser = store.getState().user;

    subscribeGameLambda(preGame.game.id, connectionId, (error: string) => {
        if (error) {

            if (subscribeTried < 3) {
                setTimeout(() => {
                    subscribeTried++;
                    subscribeGame(preGame);
                }, 3000);
            }

        } else {

            store.dispatch(gameSubscribed(preGame, currentUser));
            store.dispatch(push('/game'));
        }
    });
}


export const sendChatMessage = (gameId: string, userId: string, message: string) => {

    sendChatMessageLambda(gameId, userId, message, (error: string) => {
        if (error) {

        } else {

        }
    })

}


export const newGameMove = (gameId: string, userId: string, fen: string, move: any) => {
    store.dispatch(newGameMoveAction(fen, move));
    newGameMoveLambda(gameId, userId, fen, move, (error: string) => {
        if (error) {

        } else {

        }
    })

}


export const abortGame = () => {

    const gameId = store.getState().game.id;
    const userId = store.getState().game.player.id;

    store.dispatch(gameAborted(gameId, userId));

    abortGameLambda(gameId, userId, (error: string) => {
        if (error) {

        } else {

        }
    })

}


export const sendDrawRequest = () => {
    const game = store.getState().game;

    store.dispatch({ type: GameActionTypes.DRAW_REQUEST_SENT });
    sendDrawRequestLambda(game.id, game.player.id || '', game.opponent.id || '', GameActionTypes.DRAW_REQUEST, (error: string) => {

    });

}


export const acceptDrawRequest = () => {
    const game = store.getState().game;

    sendDrawRequestLambda(game.id, game.player.id || '', game.opponent.id || '', GameActionTypes.DRAW_REQUEST_ACCEPT, (error: string) => {

    });

}

export const declineDrawRequest = () => {
    const game = store.getState().game;

    store.dispatch({ type: GameActionTypes.CLOSE_PRE_GAME_POPUP });

    sendDrawRequestLambda(game.id, game.player.id || '', game.opponent.id || '', GameActionTypes.DRAW_REQUEST_DECLINE, (error: string) => {

    });

}