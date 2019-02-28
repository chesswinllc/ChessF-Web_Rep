import { FriendAction } from '../actions/Actions';
import Friend from 'src/model/Friend';
import { FriendActionTypes, UserActionTypes } from '../actions/ActionTypes';
import { Action } from 'redux';


export default (state: Friend[] = [], action: Action) => {
    switch (action.type) {
        case FriendActionTypes.SAVE_FRIENDS:
            const newAction = (action as FriendAction)
            return newAction.payload
        case UserActionTypes.LOGOUT_SUCCESS:
            return [];
        default:
            return state;
    }

}