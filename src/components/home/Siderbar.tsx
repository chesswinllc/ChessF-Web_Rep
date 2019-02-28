import * as React from 'react';
import { connect } from 'react-redux';
import PointItem from '../sidebar/PointItem';
import Button from '../common/Button';
import { IReduxStore } from 'src/redux';
import User from 'src/model/User';
import Friends from '../sidebar/Friends';
import ConnectionIndicator from '../sidebar/ConnectionIndicator';

export interface ISidebarProps {
    user: User
}

const Sidebar = class extends React.Component<ISidebarProps, any> {
    public render() {


        const { user } = this.props;


        return (
            <div className='sidebar'>
                <ConnectionIndicator />
                <img className='sidebar__settings-icon' src={require('../../assets/icons/settings.svg')} />

                <img className='avatar mrl-a mrr-a' src={user.profile_picture} />
                <h4 className='sidebar__name'>{user.name}</h4>
                <div className='divider divider--hor divider--sidebar mrb-0px' />


                <div className='sidebar__content'>
                    <div className='sidebar__points-lbl'>POINTS</div>

                    <PointItem gold={true} iconName='coins-gold' name='Gold Points' value={user.gold_points || 0} />
                    <PointItem gold={false} iconName='coins-silver' name='Standard Points' value={user.silver_points || 0} />

                    <div className='divider divider--hor divider--sidebar mrt-25px ' />


                    <div className='sidebar__points-lbl' >PLAY NOW</div>

                    <Button text='PLAY GOLD' className='btn--sidebar btn--sidebar-gold mrb-20px' />
                    <Button text='PLAY STANDARD' className='btn--sidebar btn--sidebar-standard' />

                    <div className='divider divider--hor divider--sidebar mrt-25px ' />

                    <Friends />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: IReduxStore) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Sidebar);