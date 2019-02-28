import * as React from 'react';
import Button from 'src/components/common/Button';
import FaqItem from 'src/components/home/FaqItem';
import { History } from 'history';
import Footer from 'src/components/common/Footer';

export interface IHomeProps {
    history: History
}

export default class Home extends React.Component<IHomeProps, any> {
    public render() {
        return (
            <div className='landing'>
                <div className='landing__content'>
                    <Button onClick={this.goToLogin} text='Log In' className='btn--gold float-r' />
                    <img className='landing__logo' src={require('../../assets/imgs/logo.png')} />
                    <h1 className='landing__title'>Chess Win,<br />best game up to date.</h1>

                    <p className='landing__p'>When television was young, there was a hugely popular show based on the still popular fictional character of Superman. The opening of that show had a familiar phrase that went, “Look. Up in the sky. It’s a bird. It’s a plane. It’s Superman!” How beloved Superman has become in our culture and the worldwide fascination with extraterrestrials and all things cosmic only emphasizes that there is a deep curiosity in all humans about nature and astronomy, even if many people would not know to call it astronomy.</p>

                    <p className='landing__p'>Every avid independent filmmaker has dreamed about making that special interest documentary, or short film to show off their creative prowess. Many have great ideas and want to “wow” the film-festival scene, or video renters with their big project.  But once you have the film “in the can” (no easy feat), how do you move from a couple of master DVDs with the “Sharpie” marked hand-written title inside a secondhand CD case, to a pile of cardboard boxes full of shiny new, retail-ready DVDs, with UPC barcodes and polywrap sitting on your doorstep?  You need to create eye-popping artwork and have your project replicated. Using a reputable full service DVD Replication company like PacificDisc, Inc. to partner with is certainly a helpful option to ensure a professional end result, but to help with your DVD replication project, here are 4 easy steps to follow for good DVD replication results: </p>

                    <div className='landing__store-btns'>
                        <img className='landing__store-btn mrr-10px' src={require('../../assets/imgs/apple-store.png')} />
                        <img className='landing__store-btn mrl-10px' src={require('../../assets/imgs/google-play.png')} />
                    </div>
                </div>

                <div className='landing__faq'>
                    <div className='landing__content'>
                        <h2 className='landing__title landing__title--faq'>F.A.Q</h2>
                        <div className='landing__faqs'>

                            <div className='landing__faqs-row'>
                                <FaqItem title='What is Chess WIN' text='I want to talk about things that are quite important to me. There are love and one my personal inaduqeuses' />
                                <FaqItem title='What is Chess WIN' text='I want to talk about things that are quite important to me. There are love and one my personal inaduqeuses' />
                            </div>

                            <div className='landing__faqs-row'>
                                <FaqItem title='What is Chess WIN' text='I want to talk about things that are quite important to me. There are love and one my personal inaduqeuses' />
                                <FaqItem title='What is Chess WIN' text='I want to talk about things that are quite important to me. There are love and one my personal inaduqeuses' />
                            </div>

                            <div className='landing__faqs-row'>
                                <FaqItem title='What is Chess WIN' text='I want to talk about things that are quite important to me. There are love and one my personal inaduqeuses' />
                                <FaqItem title='What is Chess WIN' text='I want to talk about things that are quite important to me. There are love and one my personal inaduqeuses' />
                            </div>

                        </div>
                    </div>
                </div>

                <Footer />

            </div>
        );
    }

    private goToLogin = () => {
        this.props.history.push('/login');
    }
}
