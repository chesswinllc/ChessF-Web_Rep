import * as React from 'react';

export interface IGamePointsCountProps {
    points: number,
    type: number
}

export default class GamePointsCount extends React.Component<IGamePointsCountProps, any> {
    public render() {
        const { type } = this.props;

        return (
            <div className={'points-count-card ' + (type == 2 ? 'points-count-card--silver' : '')}>
                <span className='points-count-card__title'>
                    {type == 1 ? 'TOTAL GOLD ' : 'STANDARD'}
                </span>

                <span className='points-count-card__badge'>
                    {(type == 1) && <div className='points-count-card__gold-i' />}
                    <span className='points-count-card__number'>{this.props.points}</span>
                </span>
            </div>
        );
    }
}
