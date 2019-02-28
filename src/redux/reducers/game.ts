import Game from 'src/model/Game';
import { GameActionTypes } from '../actions/GameActionTypes';
import User from 'src/model/User';

// const game: Game = {
//     "id": "8501e859-63b4-489d-9a58-62ca1a46b97f",
//     "timestamp": 1550591032375,
//     "points": 100,
//     "type": 1,
//     "requesterId": "4308e397-9e87-44cf-b365-aed78c7d2500",
//     "blackPlayerId": "100649e5-c8d0-4053-8e84-27db7d853955",
//     "whitePlayerId": "4308e397-9e87-44cf-b365-aed78c7d2500",
//     "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
//     "move": '',
//     abortedUserId: '',
//     winnerId: '',
//     chatMessages: [],
//     player: { birthdate: '2015-01-01', email: 'email', name: 'name', gender: 'male', preferred_username: 'pre', password: 'pass', country: 'argentina' },
//     opponent: { birthdate: '2015-01-01', email: 'email', name: 'name', gender: 'male', preferred_username: 'pre', password: 'pass', country: 'albania' },
// }

export default (state: Game = new Game(), action: any) => {
    switch (action.type) {
        case GameActionTypes.GAME_SUBSCRIBED:
            const preGame = action.payload;

            const game: Game = { ...preGame.game }
            game.player = action.user || new User();
            game.opponent = preGame.user;
            game.chatMessages = [];

            return game;

        case GameActionTypes.GAME_MOVE:
            const newGame = { ...state };
            newGame.fen = action.payload;
            newGame.move = action.move;
            return newGame;
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
            gameEnded.move = action.move;
            gameEnded.winnerId = action.payload.winnerId;

            return gameEnded;

        default:
            return state;
    }

}