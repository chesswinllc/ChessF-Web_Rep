import User from './User';
import ChatMessage from './ChatMessage';
import GameState from './GameState';


export default class Game {
    id: string;
    startDate: number;
    endDate: number;
    requesterId: string;
    blackPlayerId: string;
    whitePlayerId: string;
    points: number;
    type: number;
    status: number;
    gameTimeType: number;
    fairPlayEnabled: boolean;
    fen: string;
    player: User;
    opponent: User;
    chatMessages: ChatMessage[];
    abortedUserId: string;
    gameState: GameState;
}