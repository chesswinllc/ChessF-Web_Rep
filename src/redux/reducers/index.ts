import { combineReducers } from 'redux';
import { History } from 'history';
import { IReduxStore } from '..';
import { connectRouter } from 'connected-react-router';
import User from './user';
import Friends from './friends';
import PreGame from './preGame';
import Game from './game';
import ConnectionId from './connectionId';


export const Reducers = (history: History) => combineReducers<IReduxStore>({
    router: connectRouter(history),
    user: User,
    friends: Friends,
    preGame: PreGame,
    game: Game,
    connectionId: ConnectionId
})