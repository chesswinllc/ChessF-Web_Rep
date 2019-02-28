import PreGame from 'src/model/PreGame';
import { PreGameAction } from '../actions/Actions';
import { GameActionTypes } from '../actions/GameActionTypes';
import User from 'src/model/User';
import Game from 'src/model/Game';


export default (state: PreGame = new PreGame(), action: PreGameAction) => {
    switch (action.type) {
        case GameActionTypes.GAME_REQUEST_SEND:
            const preGame1: PreGame = new PreGame();
            preGame1.payload = action.payload;
            preGame1.game = action.payload;
            preGame1.user = action.user || new User;
            preGame1.status = GameActionTypes.GAME_REQUEST_SEND
            return preGame1;

        case GameActionTypes.NEW_GAME_REQUEST:
            const preGame2: PreGame = new PreGame();
            preGame2.payload = action.payload;
            preGame2.game = action.payload;
            preGame2.status = GameActionTypes.NEW_GAME_REQUEST;
            preGame2.user = action.user || new User;
            return preGame2;

        case GameActionTypes.GAME_REQUEST_DECLINED:
            const preGame3: PreGame = new PreGame();
            preGame3.payload = action.payload;
            preGame3.game = state.game;
            preGame3.status = GameActionTypes.GAME_REQUEST_DECLINED;
            preGame3.user = state.user;
            return preGame3;

        case GameActionTypes.GAME_REQUEST_ACCEPTED:
            const preGame4: PreGame = new PreGame();
            preGame4.payload = action.payload;
            preGame4.game = state.game;
            preGame4.status = GameActionTypes.GAME_REQUEST_ACCEPTED;
            preGame4.user = state.user;
            return preGame4;

        case GameActionTypes.CLOSE_PRE_GAME_POPUP:
            const preGame5: PreGame = new PreGame;
            preGame5.status = GameActionTypes.CLOSE_PRE_GAME_POPUP;
            return preGame5;

        case GameActionTypes.GAME_SUBSCRIBED:
            const preGame6: PreGame = new PreGame;
            return preGame6;

        case GameActionTypes.GAME_ABORTED_POPUP:
            const preGame7: PreGame = new PreGame;
            preGame7.status = GameActionTypes.GAME_ABORTED_POPUP;
            preGame7.user = action.user || new User;
            return preGame7;

        case GameActionTypes.DRAW_REQUEST:
            const drawGame = new PreGame();
            drawGame.status = GameActionTypes.DRAW_REQUEST;
            drawGame.game = new Game();
            drawGame.game.id = (action.payload as any).gameId;
            drawGame.game.opponent = new User();
            drawGame.game.opponent.id = (action.payload as any).userId;
            return drawGame;

        case GameActionTypes.DRAW_REQUEST_DECLINE:
            const drawGame2 = new PreGame();
            drawGame2.status = GameActionTypes.DRAW_REQUEST_DECLINE;
            drawGame2.game = new Game();
            drawGame2.game.id = (action.payload as any).gameId;
            drawGame2.game.opponent = new User();
            drawGame2.game.opponent.id = (action.payload as any).userId;
            return drawGame2;

        case GameActionTypes.DRAW_REQUEST_ACCEPT:
            const drawGame3 = new PreGame();
            drawGame3.status = GameActionTypes.DRAW_REQUEST_ACCEPT;
            drawGame3.game = new Game();
            drawGame3.game.id = (action.payload as any).gameId;
            drawGame3.game.opponent = new User();
            drawGame3.game.opponent.id = (action.payload as any).userId;
            return drawGame3;

        case GameActionTypes.DRAW_REQUEST_SENT:
            const drawGame4 = new PreGame();
            drawGame4.status = GameActionTypes.DRAW_REQUEST_SENT;
            drawGame4.game = new Game();
            return drawGame4;

        default:
            return state;
    }

}