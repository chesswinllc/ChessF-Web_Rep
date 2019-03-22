import * as React from 'react';
import Timer from './Timer';
import Figure from './Figure';
import { getCountryName } from 'src/utils/countries';
import { _PlayerInfos } from './Game';
import Game from 'src/model/Game';
import { game } from './MyChessBoard';
import User from 'src/model/User';

export interface IPlayerInfoProps {
    game: Game,
    isOpponent: boolean,
    playerId: string
}

export default class PlayerInfo extends React.Component<IPlayerInfoProps, any> {

    public state = { fen: '' }
    private mounted: boolean;

    public componentWillMount() {
        this.mounted = true;
        this.setState({ fen: this.props.game.fen });
    }

    componentWillUnmount() {
        this.mounted = false;
    }


    public shouldComponentUpdate(nextProps: IPlayerInfoProps, nextState: any) {

        if (this.state.fen !== nextState.fen) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        _PlayerInfos[_PlayerInfos.length + 1] = this;
    }

    public update = (fen: string) => {
        if (!this.mounted) { return; }
        this.setState({ fen: fen });
    }

    public render() {

        const { game, isOpponent, playerId } = this.props;
        const { fen } = this.state;

        const whichPlayer = playerId == game.whitePlayerId ? ' w ' : ' b ';

        const myTurn = fen.indexOf(whichPlayer) !== -1 ? true : false;

        const player: User = isOpponent ? game.opponent : game.player;

        return (
            <div className='playerI'>
                <img className='avatar avatar--square  playerI__avatar' src={player.profile_picture} />

                <div className='playerI__name-w'>
                    <div className='playerI__name'>
                        <span className={'playerI__flag flag-icon flag-icon-' + getCountryName(player.country).toLowerCase()}></span>
                        {player.name}
                    </div>

                    <div className='playerI__figures'>
                        {this.renderFigures()}
                    </div>

                </div>

                <Timer
                    isOpponent={isOpponent}
                    myTurn={myTurn}
                    isWhitePlayer={whichPlayer === ' w ' ? true : false} />
            </div>
        );
    }

    private renderFigures = () => {

        if (!game) { return; }

        var history = game.history({ verbose: true });
        var initial = {
            w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
            b: { p: 0, n: 0, b: 0, r: 0, q: 0 }
        };

        var captured = history.reduce(function (acc: any, move: any) {
            if ('captured' in move) {
                var piece = move.captured;
                // switch colors since the history stores the color of the player doing the
                // capturing, not the color of the captured piece
                var color = move.color == 'w' ? 'b' : 'w';
                acc[color][piece] += 1;
                return acc;
            } else {
                return acc;
            }
        }, initial);


        //chose opponent color
        const col = this.props.playerId == this.props.game.whitePlayerId ? 'b' : 'w';


        var els = [];

        for (var e in captured[col]) {
            if (!captured[col][e]) { continue; }

            const figure = <Figure key={e} figure={e} count={captured[col][e] - 1} color={col} />
            els.push(figure);
        }

        return els;
    }
}

