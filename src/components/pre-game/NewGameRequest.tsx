import * as React from 'react';
import Game from 'src/model/Game';
import User from 'src/model/User';
import { acceptGameRequest, declineGameRequest } from 'src/services/GameService';
import { Action } from 'redux';
import Loader from '../common/Loader';
import { getTimeByType } from 'src/utils/timeutils';
// import { closePreGamePopup } from 'src/redux/actions/ActionCreators';

export interface INewGameRequestProps {
    payload: Game,
    user: User,
    dispatch: (action: Action) => any
}

export default class NewGameRequest extends React.Component<INewGameRequestProps, any> {

    public state = { loading: false }
    private timeout: any;

    componentDidMount() {
        // this.timeout = setTimeout(() => {
        // this.props.dispatch(closePreGamePopup());
        // }, 30000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    public render() {

        const { user, payload } = this.props;

        return (
            <div className='popup'>
                <div className='popup__user-infos'>
                    <img className='avatar avatar--2xsmall' src={user.profile_picture} />
                    <span className='popup__name'>{user.name}</span>
                    <div className='popup__sec-span'>wants to play</div>
                </div>


                <div className='popup__section'>
                    <span className='popup__section-title'>PlAY WITH</span>

                    <div className='popup__row'>
                        <span className={'popup__section-title2 ' + (payload.type == 1 ? 'color-gold' : '')}>
                            {payload.type == 1 ? 'Gold Points' : 'Standard'}
                        </span>

                        <span className={'popup__section-value ' + (payload.type == 1 ? 'color-gold' : '')}>
                            <img src={require('../../assets/icons/coins-' + (payload.type == 1 ? 'gold' : 'silver') + '.svg')} />
                            <span>{payload.points}</span>
                        </span>
                    </div>
                </div>


                <div className='popup__section'>
                    <span className='popup__section-title'>MOVE TIME</span>

                    <div className='popup__row'>
                        <span className='popup__section-title2'>Time chosen</span>

                        <span className='popup__section-value'>
                            <img src={require('../../assets/icons/timer.svg')} />
                            <span>{getTimeByType(payload.gameTimeType)}</span>
                        </span>
                    </div>
                </div>


                <div className='popup__section'>
                    <span className='popup__section-title'>FAIR PLAY</span>

                    <div className='popup__row'>
                        <span className={'popup__section-title2'}>
                            {payload.fairPlayEnabled ? 'Enabled' : 'Disabled'}
                        </span>

                        <span className={'popup__section-value ' + (payload.fairPlayEnabled ? 'color-green' : '')}>
                            <span>{payload.fairPlayEnabled ? 'ON' : 'OFF'}</span>
                        </span>
                    </div>
                </div>


                {this.state.loading ?
                    <div className='popup__btns popup__btns--content-center'>
                        <Loader color='rgb(0,143,69)' width={30} height={30} />
                    </div> :

                    <div className='popup__btns'>
                        <div onClick={this.accept} className='popup__btn popup__btn--accept'>
                            Accept
                        </div>

                        <div onClick={this.decline} className='popup__btn popup__btn--decline'>
                            Decline
                        </div>
                    </div>
                }
            </div>
        );
    }

    private accept = () => {
        this.setState({ loading: true });
        acceptGameRequest(this.props.payload);
    }

    private decline = () => {
        declineGameRequest(this.props.user.id || '', this.props.payload.id);
    }
}
