import User from './User';
import ChatMessage from './ChatMessage';


export default class Game {
    id: string;
    requesterId: string;
    timestamp: number;
    blackPlayerId: string;
    whitePlayerId: string;
    points: number;
    type: number;
    fen: string;
    move: string;
    player: User;
    opponent: User;
    chatMessages: ChatMessage[]
    abortedUserId: string
    winnerId: string
}