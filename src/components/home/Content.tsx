import * as React from 'react';
import { connect } from 'react-redux';
// import Button from 'src/components/common/Button';
import Chat from '../game/Chat';
import GameComponent from '../game/Game';
// import { openConfirmDialog } from '../ConfirmDialog';
// import { abortGame, sendDrawRequest } from 'src/services/GameService';
import { IReduxStore } from 'src/redux';
import { push } from 'connected-react-router';
import Game from 'src/model/Game';
import { gameAbortedPopup } from 'src/redux/actions/ActionCreators';
import GameEnded from '../game/GameEnded';
import GamePointsCount from '../game/GamePointsCount';


export interface IContentProps {
    game: Game,
    dispatch: any;
    userId: string;
}

const Content = class extends React.Component<IContentProps, any> {

    public componentWillReceiveProps(nextProps: IContentProps) {
        if (!nextProps.game.id) {
            this.props.dispatch(push('/'));


            if (nextProps.game.abortedUserId && (nextProps.game.abortedUserId != this.props.game.player.id)) {
                this.props.dispatch(gameAbortedPopup(this.props.game.opponent));
            }
        }
    }

    public shouldComponentUpdate(nextProps: IContentProps, nextState: any) {

        if (!nextProps.game.id) {
            return true;
        }

        if (nextProps.game.winnerId) {
            return true;
        }


        return false;
    }


    public render() {

        if (!this.props.game.id) {
            return <div />
        }

        return (
            <div className='content-pv'>
                {/* <div className='flex'>
                    <Button onClick={this.drawGame} text='Draw Game' className='btn--white mrl-25px mrt-10px mrb-10px' />
                    <Button onClick={() => this.abortGame(false)} text='Abandon Game' className='btn--white mrl-a mrr-25px mrt-10px mrb-10px' />
                </div> */}

                <div className='content-pv__game'>
                    <GameComponent />
                    <div className='content-pv__right-part'>
                        <GamePointsCount points={this.props.game.points} />
                        <Chat />
                    </div>
                </div>


                {this.props.game.winnerId &&
                    <GameEnded
                        userId={this.props.userId}
                        winnerId={this.props.game.winnerId}
                        dispatch={this.props.dispatch} />}
            </div>
        );
    }


    // private drawGame = () => {
    //     sendDrawRequest();
    // }

    // private abortGame = (confirm: boolean) => {
    //     openConfirmDialog('Are u sure u want to leave game ?', () => {
    //         abortGame();
    //     })
    // }
}


const mapStateToProps = (state: IReduxStore) => {
    return {
        game: state.game,
        userId: state.user.id
    }
}

export default connect(mapStateToProps)(Content);