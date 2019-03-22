import { Action } from 'redux';
import User from 'src/model/User';
import Friend from 'src/model/Friend';


export interface UserAction extends Action {
    payload: User
}

export interface FriendAction extends Action {
    payload: Friend[]
}


export interface PreGameAction extends Action {
    payload: any,
    user?: User
}

export interface GameAction extends Action {
    payload: any,
    userId?: string
}