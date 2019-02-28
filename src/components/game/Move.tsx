import * as React from 'react';

export interface IMoveProps {
    i: number,
    move: any
}

export default class Move extends React.Component<IMoveProps, any> {
    public render() {
        const { i, move } = this.props;

        return (
            <span className='game-moves__move'>
                {i + '. ' + move.to}
            </span>
        );
    }
}
