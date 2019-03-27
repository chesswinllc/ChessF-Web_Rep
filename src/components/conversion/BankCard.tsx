import * as React from 'react';
import Button from '../common/Button';
import CardInput from './CardInput';

export interface IBankCardProps {
    className?: string
}

export default class BankCard extends React.Component<IBankCardProps, any> {
    public render() {

        const { className } = this.props;

        return (
            <div className={'bank-card ' + (className || '')}>

                <img className='bank-card__icon' src={require('../../assets/icons/credit-card.svg')} />

                <div className='bank-card__col2'>
                    <h5 className='bank-card__title'>Convert your Gold Coins into real cash!</h5>

                    <div className='bank-card__inputs mrb-10px'>
                        <CardInput name='Bank Name' className='card-input--first' />
                        <CardInput value='AL' name='Country' dropDown={true} items={['AL', 'KS', 'UK', 'US', 'ZE']} />
                    </div>

                    <CardInput name='Bank Account' />
                </div>

                <div className='divider divider--bank-card mrl-20px' />

                <div className='bank-card__values'>
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