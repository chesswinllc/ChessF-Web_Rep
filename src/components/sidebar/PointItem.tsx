import * as React from 'react';

export interface IPointItemProps {
    iconName: string,
    name: string,
    value: number,
    gold: boolean
}

export default class PointItem extends React.Component<IPointItemProps, any> {
    public render() {

        const { iconName, name, value, gold } = this.props;

        return (
            <div className={'sidebar__point-item ' + (gold ? 'sidebar__point-item--gold' : 'sidebar__point-item--silver')}>
                <img className='sidebar__point-item-icon' src={require('../../assets/icons/' + iconName + '.svg')} />
                <div className='sidebar__point-item-name'>{name}</div>
                <span className='sidebar__point-item-value'>{value}</span>
            </div>
        );
    }
}
