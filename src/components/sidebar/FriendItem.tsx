import * as React from 'react';
import Button from '../common/Button';
import Friend from 'src/model/Friend';
import User from 'src/model/User';
import PreGame from 'src/model/PreGame';
import { getCountryName } from 'src/utils/countries';
import { openGamePrefsDialog } from '../GamePrefsDialog';

export interface IFriendItemProps {
    friend: Friend,
    user: User,
    preGame: PreGame
}

export default class FriendItem extends React.Component<IFriendItemProps, any> {

    public state = { hovered: false }

    public render() {


        const { friend, preGame } = this.props;


        const showChallengeBtn = !preGame.payload;


        return (
            <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className='friend'>
                <img className='avatar avatar--small avatar--borderless mrr-15px' src={friend.profile_picture} />
                {(friend.status > 0) && <span className='friend__status friend__status--on' />}

                <div>
                    <div className='friend__name'>{friend.name}</div>
                    <div className='friend__options'>
                        <span className={'playerI__flag mrr-10px flag-icon flag-icon-' + getCountryName(friend.country).toLowerCase()}></span>
                        {showChallengeBtn && <Button onClick={this.challenge} text={'Challenge'} className='btn--sidebar btn--sidebar-gold btn--sidebar-small mrr-10px mrt-0px' />}
                    </div>
                </div>
            </div>
        );
    }


    private onMouseEnter = () => {
        // this.setState({ hovered: true })
    }

    private onMouseLeave = () => {
        // this.setState({ hovered: false })
    }

    private challenge = () => {
        openGamePrefsDialog(this.props.friend, this.props.user, (gameOptions: any) => {

        })

    }
}
