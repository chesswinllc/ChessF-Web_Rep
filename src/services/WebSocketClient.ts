import { WEBSOCKET_URL } from 'src/config';
import { GameActionTypes } from 'src/redux/actions/GameActionTypes';

// import { $GameObs } from 'src/services/GameService';
import { newGameRequest, gameRequestDeclined, gameRequestAccepted, connectionOn, connectionOff, newChatMessage, newGameMoveAction, gameAborted, drawRequestAction, updateUserPoints, gameEnded } from 'src/redux/actions/ActionCreators';
import { store } from 'src/redux';
import { UserActionTypes } from 'src/redux/actions/ActionTypes';

export default class WebSocketClient {
    private url: string;
    private instance: WebSocket;
    private static _internalInstance: WebSocketClient;

    public static getInstance(): WebSocketClient {
        if (!WebSocketClient._internalInstance) {
            WebSocketClient._internalInstance = new WebSocketClient();
        }

        return WebSocketClient._internalInstance;
    }

    open = (userId: string) => {

        this.url = WEBSOCKET_URL + userId;
        this.instance = new WebSocket(this.url);

        this.instance.onopen = this.onOpenListener;
        this.instance.onclose = this.onCloseListener;
        this.instance.onmessage = this.onMessageListener
    }

    close = () => {
        this.instance.close(1000);
    }

    onOpenListener = (ev: any) => {
        console.log('connected');
    }

    onCloseListener = (ev: CloseEvent) => {
        store.dispatch(connectionOff())
        switch (ev.code) {
            case 1000:	// CLOSE_NORMAL
                console.log("WebSocket: closed");
                break;
            default:	// Abnormal closure
                this.reconnect();
                break;
        }

    }

    onMessageListener = (ev: any) => {
        const event = JSON.parse(ev.data);

        if (!event.type) {
            return;
        }

        // console.log(event);

        switch (event.type) {
            case UserActionTypes.POINTS_UPDATED:
                store.dispatch(updateUserPoints(event.payload.goldPoints, event.payload.silverPoints));
                break;
            case GameActionTypes.NEW_GAME_REQUEST:
                // $GameObs.next(newGameRequest(event.user, event.payload));
                store.dispatch(newGameRequest(event.user, event.payload));
                break;
            case GameActionTypes.GAME_REQUEST_DECLINED:
                // $GameObs.next(gameRequestDeclined(event.payload));
                store.dispatch(gameRequestDeclined(event.payload));
                break;
            case GameActionTypes.GAME_REQUEST_ACCEPTED:
                // $GameObs.next(gameRequestAccepted(event.payload));
                store.dispatch(gameRequestAccepted(event.payload));
                break;
            case GameActionTypes.CONNECTION_ID:
                store.dispatch(connectionOn(event.payload));
                break;
            case GameActionTypes.CHAT_MESSAGE:
                store.dispatch(newChatMessage(event.payload, event.userId));
                break;
            case GameActionTypes.GAME_MOVE:
                store.dispatch(newGameMoveAction(event.payload, event.move));
                break;
            case GameActionTypes.GAME_ABORT:
                store.dispatch(gameAborted(event.gameId, event.userId));
                break;
            case GameActionTypes.DRAW_REQUEST:
                store.dispatch(drawRequestAction(event.gameId, event.userId, event.playerId || '', GameActionTypes.DRAW_REQUEST));
                break;
            case GameActionTypes.DRAW_REQUEST_DECLINE:
                store.dispatch(drawRequestAction(event.gameId, event.userId, event.playerId || '', GameActionTypes.DRAW_REQUEST_DECLINE));
                break;
            case GameActionTypes.DRAW_REQUEST_ACCEPT:
                store.dispatch(drawRequestAction(event.gameId, event.userId, event.playerId || '', GameActionTypes.DRAW_REQUEST_ACCEPT));
                break;
            case GameActionTypes.GAME_ENDED:
                store.dispatch(gameEnded(event.payload, event.move, event.winnerId, event.userId))
                break;
            default:
                break;
        }
    }

    reconnect = () => {
        this.instance.removeEventListener('open', this.onOpenListener)
        this.instance.removeEventListener('close', this.onCloseListener);


        setTimeout(() => {
            this.open(this.url);
        }, 5000);
    }
}