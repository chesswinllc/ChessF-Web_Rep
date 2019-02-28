import * as React from 'react';

export interface IGamePointsCountProps {
    points: number
}

export default class GamePointsCount extends React.Component<IGamePointsCountProps, any> {
    public render() {
        return (
            <div className='points-count-card'>
                <span className='points-count-card__title'>TOTAL GOLD</span>

                <span className='points-count-card__badge'>
                    <div className='points-count-card__gold-i' />
                    <span className='points-count-card__number'>{this.props.points}</span>
                </span>
            </div>
        );
    }
}
