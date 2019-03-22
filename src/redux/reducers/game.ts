import Game from 'src/model/Game';
import { GameActionTypes } from '../actions/GameActionTypes';
import User from 'src/model/User';
import GameState from 'src/model/GameState';

// const game: Game = {
//     "id": "8501e859-63b4-489d-9a58-62ca1a46b97f",
//     startDate: 123123,
//     endDate: 1313213,
//     status: 1,
//     gameTimeType: 1,
//     fairPlayEnabled: true,
//     gameState: {
//         fen: '',
//         from: '',
//         to: '',
//         promotion: '',
//         moveBy: '',
//         movesCount: 3,
//         winnerId: '',
//         whitePLastMoveTime: 1,
//         whitePTimeLeftInSec: 2,
//         blackPLastMoveTime: 1,
//         blackPTimeLeftInSec: 2
//     },
//     "points": 100,
//     "type": 1,
//     "requesterId": "4308e397-9e87-44cf-b365-aed78c7d2500",
//     "blackPlayerId": "100649e5-c8d0-4053-8e84-27db7d853955",
//     "whitePlayerId": "4308e397-9e87-44cf-b365-aed78c7d2500",
//     "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
//     abortedUserId: '',
//     chatMessages: [],
//     player: { birthdate: '2015-01-01', email: 'email', name: 'name', gender: 'male', preferred_username: 'pre', password: 'pass', country: 'argentina', gold_points: 100, silver_points: 100 },
//     opponent: { birthdate: '2015-01-01', email: 'email', name: 'name', gender: 'male', preferred_username: 'pre', password: 'pass', country: 'albania', gold_points: 100, silver_points: 100 },
// }

export default (state: Game = new Game(), action: any) => {
    switch (action.type) {
        case GameActionTypes.GAME_SUBSCRIBED:
            const preGame = action.payload;

            const game: Game = { ...preGame.game }
            game.gameState = new GameState()
            game.gameState.fen = game.fen;
            game.player = action.user || new User();
            game.opponent = preGame.user;
            game.chatMessages = [];

            return game;

        case GameActionTypes.GAME_MOVE:
            const newGame = { ...state };
            newGame.fen = action.payload.fen;
            newGame.gameState = action.payload;
            return newGame;

        case GameActionTypes.GAME_MOVE_FEN_ONLY:
            const newGame2 = { ...state };
            newGame2.fen = action.payload;
            newGame2.gameState.fen = action.payload;
            return newGame2;

        case GameActionTypes.CHAT_MESSAGE:

            state.chatMessages.push({
                userId: action.userId,
                message: action.payload
            });
            return { ...state, chatMessages: [...state.chatMessages] };

        case GameActionTypes.GAME_ABORT:
            if (state.id) {
                const abortedGame = new Game();
                abortedGame.abortedUserId = action.userId

                return abortedGame;
            }
            return state;

        case GameActionTypes.DRAW_REQUEST_ACCEPT:
            return new Game();

        case GameActionTypes.FINISH_GAME:
            return new Game();

        case GameActionTypes.GAME_ENDED:

            const gameEnded = { ...state };
            gameEnded.fen = action.payload.fen;
            gameEnded.gameState = action.payload;

            return gameEnded;

        default:
            return state;
    }

}