import * as React from 'react';
import { Action } from 'redux';
import { finishGame } from 'src/redux/actions/ActionCreators';

export interface IGameEndedProps {
    userId: string,
    winnerId: string,
    dispatch: (action: Action) => any
}

export default class GameEnded extends React.Component<IGameEndedProps, any> {

    public state = { show: false }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true });
        }, 2000);
    }

    public render() {

        const txt = this.props.winnerId == this.props.userId ? 'Congratulations you are winner' : 'You are a loser';


        if (!this.state.show) {
            return <span />
        }
        return (
            <div className='confirm-dialog'>
                <div className='popup popup--confirm'>

                    <div className='popup__sec-name p-20px'>{txt}</div>

                    <div className='popup__btns'>

                        <div onClick={this.close} className='popup__btn popup__btn--decline popup__btn--accept-no-border'>Okay</div>

                    </div>
                </div>
            </div>
        );
    }

    private close = () => {
        this.props.dispatch(finishGame())
    }
}
