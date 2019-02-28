import { GameActionTypes } from 'src/redux/actions/GameActionTypes';
import User from './User';
import Game from './Game';

export default class PreGame {
    status: GameActionTypes;
    user: User;
    payload: any;
    game: Game
}