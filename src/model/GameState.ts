export default class GameState {
    fen: string;
    from: string;
    to: string;
    promotion: string;
    moveBy: string;
    movesCount: number;
    winnerId: string;
    whitePLastMoveTime: number;
    whitePTimeLeftInSec: number;
    blackPLastMoveTime: number;
    blackPTimeLeftInSec: number;
}