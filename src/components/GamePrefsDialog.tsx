import * as React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import { getCountryName } from 'src/utils/countries';
import GamePrefsSection from './game-prefs-dialog/GamePrefsSection';
import Button from './common/Button';
import User from 'src/model/User';
import { sendGameRequest } from 'src/services/GameService';
import { IReduxStore } from 'src/redux';
import Game from 'src/model/Game';


interface IGamePrefsDialogProps {
    game: Game
}

export let openGamePrefsDialog: (friend: User, user: User, callback?: any, type?: number) => void;


const GamePrefsDialog = (props: IGamePrefsDialogProps) => {


    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState();
    const [gamePrefs, setGamePrefs] = useState({ points: 700, type: 2, fairPlayEnabled: false, gameTimeType: 1 });

    const toggleActive = () => {
        setActive(!active);
    }

    openGamePrefsDialog = (friend: User, user: User, callback?: any, type?: number) => {
        toggleActive();
        setCallback({ friend, user, func: callback });

        if (type) {
            setGamePrefs({ ...gamePrefs, type, points: type == 1 ? 7 : 700 });
        }
    }

    const close = () => {
        toggleActive();
        setLoading(false);
        setCallback({ func: undefined });
    }

    //component methods
    const toggleFairPlay = () => {
        gamePrefs.fairPlayEnabled = !gamePrefs.fairPlayEnabled;
        setGamePrefs({ ...gamePrefs });
    }

    const toggleGameMode = (mode: number) => {
        if (gamePrefs.type == mode) { return; }
        gamePrefs.type = mode;

        if (mode == 1) {
            gamePrefs.points = 3;
        } else {
            gamePrefs.points = 700;
        }

        setGamePrefs({ ...gamePrefs });
    }

    const setGamePoints = (points: number) => {
        if (gamePrefs.points == points) { return; }
        gamePrefs.points = points;
        setGamePrefs({ ...gamePrefs });
    }

    const setGameTimeType = (type: number) => {
        if (gamePrefs.gameTimeType == type) { return; }
        gamePrefs.gameTimeType = type;
        setGamePrefs({ ...gamePrefs });
    }

    const sendChallenge = () => {
        setLoading(true);
        sendGameRequest(callback.user || '', callback.friend || '', gamePrefs, () => {
            setLoading(false);
            toggleActive();
        })

    }



    if (!active || props.game.id) {
        return <div />
    }


    return (
        <div className='gameprefs-popup'>
            <div className='gameprefs-popup__content'>
                {!loading && <i onClick={close} className='material-icons gameprefs-popup__close-i'>close</i>}
                <div className='gameprefs-popup__players mrb-20px'>
                    <img className='avatar avatar--small avatar--square avatar--border-small' src={callback.user.profile_picture} />

                    <span className='gameprefs-popup__vs-span'>VS</span>

                    <div className='flex'>
                        <img className='avatar avatar--small avatar--square avatar--border-small mrr-10px' src={callback.friend.profile_picture} />
                        <div className='self-center'>
                            <span className={'playerI__flag flag-icon flag-icon-' + getCountryName('albania').toLowerCase()}></span>
                            <span className='gameprefs-popup__player-name'>{callback.friend.name} </span>
                            <div className='rem-08 color-white fw-300'>{callback.friend.preferred_username} </div>
                        </div>
                    </div>

                </div>


                <GamePrefsSection title='Play With'>
                    <div className='gameprefs-popup__row'>
                        <Button onClick={() => toggleGameMode(2)} icon={require('../assets/icons/coins-silver.svg')} text='Standard' className={'btn--game-prefs mrr-10px ' + (gamePrefs.type == 2 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => toggleGameMode(1)} icon={require('../assets/icons/coins-gold.svg')} text='Gold' className={'btn--game-prefs ' + (gamePrefs.type == 1 ? 'btn--game-prefs-active' : '')} />
                    </div>
                    {(gamePrefs.type == 1) && <div className='gameprefs-popup__row  mrt-15px'>
                        <Button onClick={() => setGamePoints(1)} icon={require('../assets/icons/coins-gold.svg')} text='1' className={'btn--game-prefs mrr-5px ' + (gamePrefs.points == 1 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGamePoints(3)} icon={require('../assets/icons/coins-gold.svg')} text='3' className={'btn--game-prefs mrr-5px ' + (gamePrefs.points == 3 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGamePoints(5)} icon={require('../assets/icons/coins-gold.svg')} text='5' className={'btn--game-prefs mrr-5px ' + (gamePrefs.points == 5 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGamePoints(7)} icon={require('../assets/icons/coins-gold.svg')} text='7' className={'btn--game-prefs mrr-5px ' + (gamePrefs.points == 7 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGamePoints(10)} icon={require('../assets/icons/coins-gold.svg')} text='10' className={'btn--game-prefs mrr-5px ' + (gamePrefs.points == 10 ? 'btn--game-prefs-active' : '')} />
                    </div>}
                </GamePrefsSection>


                <GamePrefsSection title='Move Time'>
                    <div className='gameprefs-popup__row  mrt-10px'>
                        <Button onClick={() => setGameTimeType(1)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 1 ? '' : '_white') + '.svg')} text='1 min' className={'btn--game-prefs mrr-10px ' + (gamePrefs.gameTimeType == 1 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGameTimeType(2)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 2 ? '' : '_white') + '.svg')} text='1 + 10s' className={'btn--game-prefs mrr-10px ' + (gamePrefs.gameTimeType == 2 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGameTimeType(3)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 3 ? '' : '_white') + '.svg')} text='2 + 10s' className={'btn--game-prefs mrr-10px ' + (gamePrefs.gameTimeType == 3 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGameTimeType(4)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 4 ? '' : '_white') + '.svg')} text='3 min' className={'btn--game-prefs ' + (gamePrefs.gameTimeType == 4 ? 'btn--game-prefs-active' : '')} />
                    </div>

                    <div className='gameprefs-popup__row  mrt-10px'>
                        <Button onClick={() => setGameTimeType(5)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 5 ? '' : '_white') + '.svg')} text='3 + 2s' className={'btn--game-prefs mrr-10px ' + (gamePrefs.gameTimeType == 5 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGameTimeType(6)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 6 ? '' : '_white') + '.svg')} text='3 + 5s' className={'btn--game-prefs mrr-10px ' + (gamePrefs.gameTimeType == 6 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGameTimeType(7)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 7 ? '' : '_white') + '.svg')} text='3 + 10s' className={'btn--game-prefs mrr-10px ' + (gamePrefs.gameTimeType == 7 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGameTimeType(8)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 8 ? '' : '_white') + '.svg')} text='5 min' className={'btn--game-prefs  ' + (gamePrefs.gameTimeType == 8 ? 'btn--game-prefs-active' : '')} />
                    </div>

                    <div className='gameprefs-popup__row  mrt-10px'>
                        <Button onClick={() => setGameTimeType(9)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 9 ? '' : '_white') + '.svg')} text='5 + 2s' className={'btn--game-prefs mrr-10px ' + (gamePrefs.gameTimeType == 9 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGameTimeType(10)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 10 ? '' : '_white') + '.svg')} text='5 + 5s' className={'btn--game-prefs mrr-10px ' + (gamePrefs.gameTimeType == 10 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGameTimeType(11)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 11 ? '' : '_white') + '.svg')} text='5 + 10s' className={'btn--game-prefs mrr-10px ' + (gamePrefs.gameTimeType == 11 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGameTimeType(12)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 12 ? '' : '_white') + '.svg')} text='10 min' className={'btn--game-prefs  ' + (gamePrefs.gameTimeType == 12 ? 'btn--game-prefs-active' : '')} />
                    </div>

                    <div className='gameprefs-popup__row  mrt-10px'>
                        <Button onClick={() => setGameTimeType(13)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 13 ? '' : '_white') + '.svg')} text='10 + 10s' className={'btn--game-prefs mrr-10px ' + (gamePrefs.gameTimeType == 13 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGameTimeType(14)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 14 ? '' : '_white') + '.svg')} text='15 min' className={'btn--game-prefs mrr-10px ' + (gamePrefs.gameTimeType == 14 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGameTimeType(15)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 15 ? '' : '_white') + '.svg')} text='15 + 10s' className={'btn--game-prefs mrr-10px ' + (gamePrefs.gameTimeType == 15 ? 'btn--game-prefs-active' : '')} />
                        <Button onClick={() => setGameTimeType(16)} icon={require('../assets/icons/timer' + (gamePrefs.gameTimeType == 16 ? '' : '_white') + '.svg')} text='30 min' className={'btn--game-prefs ' + (gamePrefs.gameTimeType == 16 ? 'btn--game-prefs-active' : '')} />
                    </div>

                </GamePrefsSection>


                <GamePrefsSection title='Fair Play' className='gameprefs-popup__section--last' >
                    <div className='gameprefs-popup__row  mrt-15px'>
                        <Button onClick={toggleFairPlay} text='Fairplay Enabled' className={'btn--game-prefs flex-0 ' + (gamePrefs.fairPlayEnabled ? 'btn--game-prefs-active' : '')} />
                        <div className='divider divider--game-prefs' />
                        <Button loading={loading} onClick={sendChallenge} text='Challenge' className='btn--game-prefs btn--game-prefs-green flex-0' />
                    </div>
                </GamePrefsSection>

            </div>
        </div>
    )

}





const mapStateToProps = (state: IReduxStore) => {
    return {
        game: state.game
    }
}

export default connect(mapStateToProps)(GamePrefsDialog);