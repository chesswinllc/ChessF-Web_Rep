import * as React from 'react';
import Loader from '../common/Loader';

export interface IDrawRequestSentProps {
}

export default class DrawRequestSent extends React.Component<IDrawRequestSentProps, any> {
    public render() {
        return (
            <div className='popup popup__content-center'>
                <div className='popup__name mrb-10px'>Waiting for opponent</div>
                <Loader color='rgb(0,143,69)' width={30} height={30} />
            </div>
        );
    }
}
