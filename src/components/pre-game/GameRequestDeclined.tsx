import * as React from 'react';
import Game from 'src/model/Game';
import User from 'src/model/User';
import { Action } from 'redux';
import { closePreGamePopup } from 'src/redux/actions/ActionCreators';

export interface IGameRequestDeclinedProps {
    payload: Game,
    user: User,
    dispatch: (action: Action) => any
}

export default class GameRequestDeclined extends React.Component<IGameRequestDeclinedProps, any> {
    public render() {

        const { user } = this.props;

        return (
            <div className='popup'>
                <div className='popup__user-infos'>
                    <img className='avatar avatar--2xsmall' src={user.profile_picture} />
                    <span className='popup__name'>{user.name}</span>
                    <div className='popup__sec-span'>not available</div>
                </div>

                <div className='popup__btns mrt-15px'>
                    <div onClick={this.okay} className='popup__btn popup__btn--accept popup__btn--accept-no-border'>
                        Okay
                    </div>
                </div>
            </div>
        );
    }

    private okay = () => {
        this.props.dispatch(closePreGamePopup())
    }
}

