import * as React from 'react';

export interface IFooterProps {
    className?: string
}

export default class Footer extends React.Component<IFooterProps, any> {
    public render() {
        const { className } = this.props;

        return (
            <div className={'footer ' + (className)}>
                <div className='footer__content'>
                    <img className='footer__logo' src={require('../../assets/imgs/logo.png')} />

                    <img className='footer__social-logo mrl-a' src={require('../../assets/icons/instagram-logo.svg')} />
                    <img className='footer__social-logo' src={require('../../assets/icons/twitter-logo.svg')} />
                    <img className='footer__social-logo' src={require('../../assets/icons/facebook-logo.svg')} />
                    <img className='footer__social-logo' src={require('../../assets/icons/youtube-logo.svg')} />
                </div>
            </div>
        );
    }
}
