import * as React from 'react';

export interface IFigureProps {
    figure: string,
    count: number,
    color: string
}

export default class Figure extends React.Component<IFigureProps, any> {
    public render() {
        const { figure, color, count } = this.props;
        return (
            <div className='playerI__figure'>
                <img className='playerI__figure-i' src={require('../../assets/icons/chess-icons/' + color + figure.toUpperCase() + '.svg')} />
                {(count > 0) && <span className='playerI__figure-count'>+{count}</span>}
            </div>
        );
    }
}
