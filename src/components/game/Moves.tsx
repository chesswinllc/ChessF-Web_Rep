import * as React from 'react';
import Move from './Move';
import GameState from 'src/model/GameState';

export interface IMovesProps {
    gameState: GameState,
    fen: string
}


export default class Moves extends React.Component<IMovesProps, any> {
    movesMock: any[] = []

    state = { moves: this.movesMock }
    private moves: HTMLDivElement;

    componentWillReceiveProps(nextProps: IMovesProps) {
        if (this.props.fen !== nextProps.fen) {
            const moves = this.state.moves;
            const gameState = nextProps.gameState;



            moves.push({ to: gameState.to, from: gameState.from });

            this.setState({ moves });
        }
    }

    componentDidUpdate(prevProps: IMovesProps, prevState: any) {
        this.moves.scrollTo(this.moves.scrollWidth, 0);
    }

    public render() {

        return (
            <div ref={(ref: any) => this.moves = ref} className='game-moves'>
                <div className='game-moves__w'>
                    {this.renderMoves()}
                </div>
            </div>
        );
    }

    private renderMoves = () => {
        return this.state.moves.map((move: any, i: number) => {
            return <Move key={i} i={i} move={move} />
        })

    }
}
