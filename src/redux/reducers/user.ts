import User from 'src/model/User'
import { UserActionTypes } from '../actions/ActionTypes';
import { UserAction } from '../actions/Actions';
//100649e5-c8d0-4053-8e84-27db7d853955
export default (state: User = new User(''), action: UserAction) => {
    switch (action.type) {
        case UserActionTypes.LOGIN_SUCCESS:
            return action.payload
        case UserActionTypes.LOGOUT_SUCCESS:
            return action.payload
        case UserActionTypes.POINTS_UPDATED:
            state.gold_points = action.payload.gold_points;
            state.silver_points = action.payload.silver_points;
            return { ...state };
        default:
            return state;
    }

}