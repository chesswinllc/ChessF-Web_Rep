import * as React from 'react';
import { connect } from 'react-redux';
import { IReduxStore } from 'src/redux';
import GameState from 'src/model/GameState';
import ChessTimeUtils from 'src/utils/chessTimeUtils';

export interface ITimerProps {
    myTurn: boolean,
    isOpponent: boolean,
    gameState: GameState,
    gameTimeType: number,
    isWhitePlayer: boolean;
}


export let _MyTimer: any;

const Timer = class extends React.Component<ITimerProps, any> {

    public state = { time: { minutes: 6, seconds: 59 } }

    private interval: any;
    private intervalActive: boolean;

    componentWillMount() {
        const gameTimeTypeSec = ChessTimeUtils.gameTimeTypeToSec(this.props.gameTimeType);
        const time = ChessTimeUtils.secToMinutesAndSec(gameTimeTypeSec);

        this.setState({ time });
    }

    componentWillUnmount() {
        this.stopInterval();
        clearInterval(this.interval);
    }


    componentWillReceiveProps(nextProps: ITimerProps) {
        if (!nextProps.gameState.whitePTimeLeftInSec || !nextProps.gameState.whitePTimeLeftInSec) {
            return;
        }
        if (nextProps.gameState.movesCount == this.props.gameState.movesCount) {
            return;
        }

        let time;

        if (this.props.isWhitePlayer) {
            time = ChessTimeUtils.secToMinutesAndSec(nextProps.gameState.whitePTimeLeftInSec);
        } else {
            time = ChessTimeUtils.secToMinutesAndSec(nextProps.gameState.blackPTimeLeftInSec);
        }

        if (time.minutes == 0 && time.seconds == 0) {
            return;
        }


        this.setState({ time });
    }

    componentDidUpdate(prevProps: ITimerProps, prevState: any) {
        if (this.props.myTurn && this.props.gameState.movesCount >= 2) {
            this.startInterval();
        }

        if (!this.props.myTurn) {
            this.stopInterval();
        }
    }


    componentDidMount() {
        if (!this.props.isOpponent) {
            _MyTimer = this;
        }
    }

    public render() {

        const { myTurn } = this.props;
        const { time } = this.state;


        const minutes = ('0' + time.minutes).slice(-2);
        const seconds = ('0' + time.seconds).slice(-2);

        return (
            <span className={'playerI__timer ' + (myTurn ? 'playerI__timer--active' : '')}>
                <img className='playerI__timer-icon' src={require('../../assets/icons/timer.svg')} />
                <span>{minutes + ':' + seconds}</span>
            </span>
        );
    }

    private startInterval = () => {
        if (this.intervalActive) { return; }
        this.interval = setInterval(() => {

            const time = this.state.time;

            if (time.seconds > 0) {
                time.seconds -= 1;
            } else {
                time.minutes -= 1;
                time.seconds = 59;
            }

            this.setState({ time });

        }, 1000)
        this.intervalActive = true;
    }

    private stopInterval = () => {
        this.intervalActive = false;
        clearInterval(this.interval);
    }
}


const mapPropsToState = (state: IReduxStore) => {
    return {
        gameState: state.game.gameState,
        gameTimeType: state.game.gameTimeType
    }
}

export default connect(mapPropsToState)(Timer);