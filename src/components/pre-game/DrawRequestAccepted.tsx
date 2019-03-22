import * as React from 'react';
import { Action } from 'redux';
import { closePreGamePopup } from 'src/redux/actions/ActionCreators';
import { push } from 'connected-react-router';

export interface IDrawRequestAcceptedProps {
    dispatch: (action: Action) => any
}

export default class DrawRequestAccepted extends React.Component<IDrawRequestAcceptedProps, any> {


    componentWillMount() {
        this.props.dispatch(push('/'));
    }


    public render() {

        return (
            <div className='popup'>
                <div className='popup__user-infos'>
                    <span className='popup__name'>Game Drawed</span>
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

