import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { RouterState, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Epics } from './epics';
import { Reducers } from './reducers';
import User from 'src/model/User';
import Friend from 'src/model/Friend';
import PreGame from 'src/model/PreGame';
import Game from 'src/model/Game';

export interface IReduxStore {
    router: RouterState,
    user: User,
    friends: Friend[],
    preGame: PreGame,
    game: Game,
    connectionId: string
}

const epicMiddleware = createEpicMiddleware();
export const history = createBrowserHistory();


export const store = createStore<IReduxStore, any, any, any>(Reducers(history), applyMiddleware(epicMiddleware, routerMiddleware(history)))


epicMiddleware.run(Epics);