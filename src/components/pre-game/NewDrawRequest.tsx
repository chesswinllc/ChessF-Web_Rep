import * as React from 'react';
import { acceptDrawRequest, declineDrawRequest } from 'src/services/GameService';
import Loader from '../common/Loader';

export interface INewDrawRequestProps {

}

export default class NewDrawRequest extends React.Component<INewDrawRequestProps, any> {
    public state = { loading: false }


    public render() {

        if (this.state.loading) {
            return (<div className='popup popup__content-center'>
                <div className='popup__name mrb-10px'>Drawing game</div>
                <Loader color='rgb(0,143,69)' width={30} height={30} />
            </div>)
        }

        return (
            <div className='popup'>
                <div className='popup__user-infos popup__user-infos--column'>
                    <span className='popup__name mrb-10px'>Opponent wants to draw game</span>
                    <div className='popup__sec-span'>you will not win or lose any point</div>
                </div>

                <div className='popup__btns'>
                    <div onClick={this.accept} className='popup__btn popup__btn--accept'>
                        Accept
                    </div>

                    <div onClick={this.decline} className='popup__btn popup__btn--decline'>
                        Decline
                    </div>
                </div>
            </div>
        );
    }

    private accept = () => {
        this.setState({ loading: true });
        acceptDrawRequest()
    }

    private decline = () => {
        declineDrawRequest();
    }
}
