import { PreGameAction } from '../actions/Actions';
import { GameActionTypes } from '../actions/GameActionTypes';

export default (state: string = '', action: PreGameAction) => {
    switch (action.type) {
        case GameActionTypes.CONNECTION_ON:
            return action.payload
        case GameActionTypes.CONNECTION_OFF:
            return '';
        default:
            return state;
    }

}