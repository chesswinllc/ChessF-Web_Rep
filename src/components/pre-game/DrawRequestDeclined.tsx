import * as React from 'react';
import { Action } from 'redux';
import { closePreGamePopup } from 'src/redux/actions/ActionCreators';

export interface IDrawRequestDeclinedProps {
    dispatch: (action: Action) => any
}

export default class DrawRequestDeclined extends React.Component<IDrawRequestDeclinedProps, any> {
    public render() {

        return (
            <div className='popup'>
                <div className='popup__user-infos'>
                    <span className='popup__name'>Draw request declined by opponent</span>
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

