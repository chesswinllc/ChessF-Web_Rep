import User from 'src/model/User';
import Friend from 'src/model/Friend';
import { UserAction, FriendAction, PreGameAction, GameAction } from './Actions';
import { UserActionTypes, FriendActionTypes } from './ActionTypes';
import { GameActionTypes } from './GameActionTypes';
import PreGame from 'src/model/PreGame';


export const saveUser = (user: User) => {
    const SaveUserAction: UserAction = {
        type: UserActionTypes.LOGIN_SUCCESS,
        payload: user
    }

    return SaveUserAction;
}


export const removeUser = () => {
    const RemoveUserAction: UserAction = {
        type: UserActionTypes.LOGOUT_SUCCESS,
        payload: new User()
    }

    return RemoveUserAction;
}

export const saveFriends = (friends: Friend[]) => {
    const SaveFriendsAction: FriendAction = {
        type: FriendActionTypes.SAVE_FRIENDS,
        payload: friends
    }

    return SaveFriendsAction;
}


export const updateUserPoints = (goldPoints: number, silverPoints: number) => {
    const dumpUser = new User();
    dumpUser.gold_points = goldPoints;
    dumpUser.silver_points = silverPoints;

    const UpdateUserPoints: UserAction = {
        type: UserActionTypes.POINTS_UPDATED,
        payload: dumpUser
    }

    return UpdateUserPoints;
}


export const connectionOn = (connectionId: string) => {

    const NewGameRequestAction: PreGameAction = {
        type: GameActionTypes.CONNECTION_ON,
        payload: connectionId
    }

    return NewGameRequestAction;

}

export const connectionOff = () => {

    const NewGameRequestAction: PreGameAction = {
        type: GameActionTypes.CONNECTION_OFF,
        payload: undefined
    }

    return NewGameRequestAction;

}

export const newGameRequest = (opponent: User, game: any) => {
    const NewGameRequestAction: PreGameAction = {
        type: GameActionTypes.NEW_GAME_REQUEST,
        payload: game,
        user: opponent
    }

    return NewGameRequestAction;
}


export const gameRequestDeclined = (gameId: string) => {

    const GameRequestCancelledAction: PreGameAction = {
        type: GameActionTypes.GAME_REQUEST_DECLINED,
        payload: gameId
    }

    return GameRequestCancelledAction;
}


export const gameRequestAccepted = (gameId: string) => {
    const SubscribeGameAction: PreGameAction = {
        type: GameActionTypes.GAME_REQUEST_ACCEPTED,
        payload: gameId
    }

    return SubscribeGameAction;
}


export const closePreGamePopup = () => {
    const ClosePreGameAction: PreGameAction = {
        type: GameActionTypes.CLOSE_PRE_GAME_POPUP,
        payload: undefined
    }

    return ClosePreGameAction;
}


export const gameSubscribed = (preGame: PreGame, currentUser: User) => {
    const GameSubscribedAction: PreGameAction = {
        type: GameActionTypes.GAME_SUBSCRIBED,
        payload: preGame,
        user: currentUser
    }

    return GameSubscribedAction;
}


export const newChatMessage = (message: string, userId: string) => {
    const ChatGameAction: GameAction = {
        type: GameActionTypes.CHAT_MESSAGE,
        payload: message,
        userId: userId
    }

    return ChatGameAction;
}


export const newGameMoveAction = (fen: string, move: any) => {
    const MoveGameAction: GameAction = {
        type: GameActionTypes.GAME_MOVE,
        payload: fen,
        move
    }

    return MoveGameAction;
}


export const gameEnded = (fen: string, move: any, winnerId: string, userId?: string) => {
    const GameEndedAction: GameAction = {
        type: GameActionTypes.GAME_ENDED,
        payload: { fen, winnerId },
        move,
        userId
    }

    return GameEndedAction;
}

export const finishGame = () => {
    const FinishGameAction: GameAction = {
        type: GameActionTypes.FINISH_GAME,
        payload: undefined
    }

    return FinishGameAction;
}


export const gameAborted = (gameId: string, userId?: string) => {
    const GameAbortedAction: GameAction = {
        type: GameActionTypes.GAME_ABORT,
        payload: gameId,
        userId
    }

    return GameAbortedAction;
}


export const gameAbortedPopup = (user: User) => {
    const GameAbortedAction: PreGameAction = {
        type: GameActionTypes.GAME_ABORTED_POPUP,
        payload: undefined,
        user
    }

    return GameAbortedAction;
}


export const drawRequestAction = (gameId: string, userId: string, playerId: string, type: GameActionTypes) => {
    const GameAbortedAction: PreGameAction = {
        type: type,
        payload: {
            gameId,
            userId,
            playerId
        }
    }

    return GameAbortedAction;
}
