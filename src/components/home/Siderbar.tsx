import * as React from 'react';
import { connect } from 'react-redux';
import PointItem from '../sidebar/PointItem';
import Button from '../common/Button';
import { IReduxStore } from 'src/redux';
import User from 'src/model/User';
import Friends from '../sidebar/Friends';
import ConnectionIndicator from '../sidebar/ConnectionIndicator';
import PreGame from 'src/model/PreGame';
import { openGamePrefsDialog } from '../GamePrefsDialog';

export interface ISidebarProps {
    user: User,
    preGame: PreGame
}

const Sidebar = class extends React.Component<ISidebarProps, any> {

    public state = { active: false }

    public render() {


        const { user } = this.props;
        const { active } = this.state;

        return (
            <div className={'sidebar ' + (active ? 'sidebar--active' : '')}>
                <ConnectionIndicator />
                <img onClick={this.switchSiderBar} className='sidebar__menu-switcher-icon' src={require('../../assets/icons/menu-switcher.svg')} />

                <img className='avatar avatar--siderbar mrl-a mrr-a' src={user.profile_picture} />
                <h4 className='sidebar__name'>{user.name}</h4>
                <div className='divider divider--hor divider--sidebar mrb-0px' />


                <div className='sidebar__content'>
                    <div className='sidebar__points-lbl'>POINTS</div>

                    <PointItem gold={true} iconName='coins-gold' name='Gold Points' value={user.gold_points || 0} />
                    <PointItem gold={false} iconName='coins-silver' name='Standard Points' value={user.silver_points || 0} />

                    <div className='divider divider--hor divider--sidebar mrt-25px ' />


                    <div className='sidebar__points-lbl' >PLAY NOW</div>

                    <Button onClick={() => this.playGold()} text='PLAY GOLD' className='btn--sidebar btn--sidebar-gold mrb-20px' />
                    <Button onClick={() => this.playSilver()} text='PLAY STANDARD' className='btn--sidebar btn--sidebar-standard' />

                    <div className='divider divider--hor divider--sidebar mrt-25px ' />

                    <Friends />
                </div>

                {!active && <div className='sidebar__switcher-layer' />}
            </div>
        );
    }

    private switchSiderBar = () => {
        this.setState({ active: !this.state.active });
    }

    private playGold = () => {
        if (this.props.preGame.payload) { return }

        openGamePrefsDialog(new User(), this.props.user, (gameOptions: any) => {

        }, 1)

    }

    private playSilver = () => {
        if (this.props.preGame.payload) { return }

        openGamePrefsDialog(new User(), this.props.user, (gameOptions: any) => {

        }, 2)

    }
}


const mapStateToProps = (state: IReduxStore) => {
    return {
        user: state.user,
        preGame: state.preGame
    }
}

export default connect(mapStateToProps)(Sidebar);