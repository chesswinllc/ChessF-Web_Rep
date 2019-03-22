import * as React from 'react';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';
import User from 'src/model/User';
import { _PlayerInfos } from './Game';
import { _MyTimer } from './Timer';
import GameState from 'src/model/GameState';


export interface IMyChessBoardProps {
    player: User,
    fen: string,
    newGameMove: (fen: string, move: any) => void;
    whitePlayerId: string,
    winnerId: string,
    gameState: GameState
}

export let game: any;

export default class MyChessBoard extends React.Component<IMyChessBoardProps, any> {

    public state: { fen: string }

    private board: any;

    componentWillMount() {
        this.setState({ fen: this.props.fen });
    }

    componentWillReceiveProps(nextProps: IMyChessBoardProps) {
        if (this.state.fen !== nextProps.fen) {
            const move = { to: nextProps.gameState.to, from: nextProps.gameState.from, promotion: nextProps.gameState.promotion }

            game.move(move, { sloppy: true });
            this.setState({ fen: game.fen() });

        }
    }


    componentDidMount() {
        game = new Chess(this.props.fen);
    }

    componentDidUpdate(prevProps: IMyChessBoardProps, prevState: any) {
        _PlayerInfos.forEach((_PlayerInfo, i) => {
            _PlayerInfo.update(this.state.fen);
        })
    }

    public render() {

        const { fen } = this.state;
        const { whitePlayerId, player, winnerId } = this.props;

        const orientation = whitePlayerId == player.id ? 'white' : 'black';

        const whichPlayer = player.id == whitePlayerId ? ' w ' : ' b ';
        let draggable = fen.indexOf(whichPlayer) !== -1 ? true : false;

        draggable = winnerId ? false : draggable;


        return (
            <Chessboard
                ref={ref => this.board = ref}
                boardStyle={style}
                showNotation={true}
                pieces={pieces}
                calcWidth={this.calcWidth}
                position={fen}
                onDrop={this.onDrop}
                orientation={orientation}
                draggable={draggable} />
        );
    }

    private calcWidth = (obj: any) => {
        return obj.screenHeight - 290;
        this.board;
    }

    private onDrop = (obj: any) => {
        let move = game.move({
            from: obj.sourceSquare,
            to: obj.targetSquare,
            promotion: "q"
        });

        if (move === null) return;

        const timeLeftInSec = (_MyTimer.state.time.minutes * 60) + _MyTimer.state.time.seconds;

        // this.setState({ fen: this.game.fen() })
        this.props.newGameMove(game.fen(), { from: obj.sourceSquare, to: obj.targetSquare, promotion: "q", timeLeftInSec });
    }

}

const style = {
    marginBottom: 20,
    marginTop: 20
}

const pieces = {

    wK: (obj: any) => getImage('wK', obj),
    bK: (obj: any) => getImage('bK', obj),
    wQ: (obj: any) => getImage('wQ', obj),
    bQ: (obj: any) => getImage('bQ', obj),
    wR: (obj: any) => getImage('wR', obj),
    bR: (obj: any) => getImage('bR', obj),
    wB: (obj: any) => getImage('wB', obj),
    bB: (obj: any) => getImage('bB', obj),
    wN: (obj: any) => getImage('wN', obj),
    bN: (obj: any) => getImage('bN', obj),
    wP: (obj: any) => getImage('wP', obj),
    bP: (obj: any) => getImage('bP', obj)
}

const getImage = (name: string, obj: any) => <img style={{ width: obj.squareWidth, height: obj.squareWidth }} src={require('../../assets/icons/chess-icons/' + name + '.svg')} />