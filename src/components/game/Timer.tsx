import * as React from 'react';

export interface ITimerProps {
    myTurn: boolean
}

export default class Timer extends React.Component<ITimerProps, any> {

    public state = { time: { minutes: 0, seconds: 0 } }

    private interval: any;

    componentWillMount() {
        if (this.props.myTurn) {
            this.startCountDown();
        }
    }

    componentWillReceiveProps(nextProps: ITimerProps) {
        if (!this.props.myTurn && nextProps.myTurn) {
            this.startCountDown();
        } else {
            this.resetCountDown();
        }
    }


    public componentWillUnmount() {
        clearInterval(this.interval);
    }

    startCountDown = () => {
        const time = { minutes: 6, seconds: 59 }
        this.setState({ time });

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
    }

    resetCountDown = () => {
        clearInterval(this.interval);
        const time = { minutes: 0, seconds: 0 }
        this.setState({ time });
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
}
