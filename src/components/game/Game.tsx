import * as React from 'react';
import { connect } from 'react-redux';
import PlayerInfo from 'src/components/game/PlayerInfo';
import MyChessBoard, { game } from './MyChessBoard';
import { IReduxStore } from 'src/redux';
import GameModel from 'src/model/Game';
import { newGameMove, unsubscribeGame, reSubscribeGame } from 'src/services/GameService';
import Moves from './Moves';
import Button from '../common/Button';
import { openConfirmDialog } from '../ConfirmDialog';
import { abortGame, sendDrawRequest } from 'src/services/GameService';



export interface IGameProps {
    game: GameModel,
    dispatch: (action: any) => void,
    connectionId: string
}

export let _PlayerInfos: any[] = [];

const Game = class extends React.Component<IGameProps, any> {


    componentWillMount() {
        if (game && game.clear()) { }
        _PlayerInfos = [];
    }


    componentWillReceiveProps(nextProps: IGameProps) {
        if (this.props.connectionId !== nextProps.connectionId) {

            unsubscribeGame(this.props.game.id, this.props.connectionId);
            reSubscribeGame(this.props.game.id, nextProps.connectionId);

        }
    }

    public shouldComponentUpdate(nextProps: IGameProps, nextState: any) {

        if (this.props.game.fen !== nextProps.game.fen) {
            return true;
        }

        return false;
    }


    public render() {

        const { game } = this.props;

        return (
            <div className='content-pv__board'>
                <Moves fen={game.fen} gameState={game.gameState} />
                <PlayerInfo game={game} isOpponent={true} playerId={game.opponent.id || ''} />

                <MyChessBoard
                    player={game.player}
                    fen={game.fen}
                    gameState={game.gameState}
                    whitePlayerId={game.whitePlayerId}
                    newGameMove={this.newGameMove}
                    winnerId={game.gameState.winnerId} />
                <PlayerInfo game={game} isOpponent={false} playerId={game.player.id || ''} />

                <div className='content-pv__game-btns'>
                    <Button onClick={this.drawGame} text='Draw Game' className='btn--white btn--bg-white' />
                    <Button onClick={() => this.abortGame(false)} text='Abandon Game' className='btn--white btn--bg-white' />
                </div>
            </div>
        );
    }

    private newGameMove = (fen: string, move: any) => {
        newGameMove(this.props.game.id, this.props.game.player.id || '', fen, move);
    }

    private drawGame = () => {
        sendDrawRequest();
    }

    private abortGame = (confirm: boolean) => {
        openConfirmDialog('Are u sure u want to leave game ?', () => {
            abortGame();
        })
    }
}


const mapStateToProps = (state: IReduxStore) => {
    return {
        game: state.game,
        connectionId: state.connectionId
    }
}

export default connect(mapStateToProps)(Game);