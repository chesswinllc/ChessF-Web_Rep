import * as React from 'react';
import Button from '../common/Button';
import CardInput from './CardInput';

export interface IPaypalCardProps {
    className?: string
}

export default class PaypalCard extends React.Component<IPaypalCardProps, any> {
    public render() {

        const { className } = this.props;

        return (
            <div className={'bank-card ' + (className || '')}>

                <img className='bank-card__icon mrr-25px' src={require('../../assets/icons/paypal.svg')} />

                <div className='bank-card__col2'>
                    <h5 className='bank-card__title'>Convert your Gold Coins into real cash!</h5>
                    <p className='bank-card__p'>For many of us, our very first experience of learning about the celestial bodies begins when we saw our first full moon in the sky. It is truly a magnificent view even to the naked eye. If the night is clear, you can see amazing detail of the lunar surface just star gazing on in your back yard.</p>

                </div>

                <div className='divider divider--bank-card mrl-20px' />

                <div className='mrl-25px mrr-25px mrt-30px'>
                    <CardInput value='100' dropDown={true} items={['100', '200', '300', '400']} inputClassName='color-gold' />
                    <CardInput readOnly={true} prefix='$' value='100' className='mrt-10px' inputClassName='color-green' />
                </div>


                <Button text='Convert' className='btn-green-gradient fw-400' />

            </div>
        );
    }
}



{/* <div className='bank-card'>
    <img className='bank-card__icon mrr-25px' src={require('../../assets/icons/credit-card.svg')} />

    <div>
        <h5 className='bank-card__title'>Convert your Gold Coins into real cash!</h5>

        <div className='bank-card__inputs mrb-10px'>
            <CardInput name='Bank Name' className='mrr-10px' />
            <CardInput value='AL' name='Country' dropDown={true} items={['AL', 'KS', 'UK', 'US', 'ZE']} />
        </div>

        <CardInput name='Bank Account' />
    </div>


    <div className=' mrl-25px mrr-25px mrt-35px '>
        <CardInput value='100' dropDown={true} items={['100', '200', '300', '400']} inputClassName='color-gold' />
        <CardInput readOnly={true} prefix='$' value='100' className='mrt-10px' inputClassName='color-green' />
    </div>


    <Button text='Convert' className='btn-green-gradient fw-400' />
</div> */}