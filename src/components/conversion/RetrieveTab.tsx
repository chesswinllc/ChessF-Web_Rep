import * as React from 'react';
import BankCard from './BankCard';
import PaypalCard from './PaypalCard';
import GiftCard from './GiftCard';
import User from 'src/model/User';
import { updateUserPoints } from 'src/redux/actions/ActionCreators';
import { store } from 'src/redux';

export interface IRetrieveTabProps {
    user: User
}

export default class RetrieveTab extends React.Component<IRetrieveTabProps, any> {
    public render() {
        return (
            <div className='conversion__tab-item'>
                <h3 className='conversion__title'>Convert Gold Coins to $</h3>

                <BankCard className='mrb-20px' />
                <PaypalCard />

                <div className='divider divider--hor divider--conversion mrt-20px mrb-20px' />

                <h3 className='conversion__title'>Convert Gold Coins to Gift Cards</h3>

                <GiftCard
                    title='Amazon Gift Card'
                    price={25}
                    btnText='Get with 25 Coins'
                    paragraph='For many of us, our very first experience of learning about the celestial bodies begins when we saw our first full moon in the sky. It is truly a magnificent view even to the naked eye.'
                    img='https://production-gameflipusercontent.fingershock.com/us-east-1:47d82dc3-4acd-4d96-8053-9ae2fae26d3a/50f34cd8-c415-4535-89d8-039705159484/8dc20250-85a7-4073-bf17-d5f6246eb100'
                    removePoints={this.removePoints} />

                <GiftCard
                    title='Amazon Gift Card'
                    price={50}
                    btnText='Get with 50 Coins'
                    paragraph='For many of us, our very first experience of learning about the celestial bodies begins when we saw our first full moon in the sky. It is truly a magnificent view even to the naked eye.'
                    img='https://production-gameflipusercontent.fingershock.com/us-east-1:47d82dc3-4acd-4d96-8053-9ae2fae26d3a/50f34cd8-c415-4535-89d8-039705159484/8dc20250-85a7-4073-bf17-d5f6246eb100'
                    removePoints={this.removePoints} />

                <GiftCard
                    title='Amazon Gift Card'
                    price={100}
                    btnText='Get with 100 Coins'
                    paragraph='For many of us, our very first experience of learning about the celestial bodies begins when we saw our first full moon in the sky. It is truly a magnificent view even to the naked eye.'
                    img='https://production-gameflipusercontent.fingershock.com/us-east-1:47d82dc3-4acd-4d96-8053-9ae2fae26d3a/50f34cd8-c415-4535-89d8-039705159484/8dc20250-85a7-4073-bf17-d5f6246eb100'
                    removePoints={this.removePoints} />

                <GiftCard
                    title='Amazon Gift Card'
                    price={200}
                    btnText='Get with 200 Coins'
                    paragraph='For many of us, our very first experience of learning about the celestial bodies begins when we saw our first full moon in the sky. It is truly a magnificent view even to the naked eye.'
                    img='https://production-gameflipusercontent.fingershock.com/us-east-1:47d82dc3-4acd-4d96-8053-9ae2fae26d3a/50f34cd8-c415-4535-89d8-039705159484/8dc20250-85a7-4073-bf17-d5f6246eb100'
                    removePoints={this.removePoints} />

            </div>
        );
    }

    private removePoints = (points: number) => {
        let goldPoints = this.props.user.gold_points;
        let silverPoints = this.props.user.silver_points;

        goldPoints -= points;

        store.dispatch(updateUserPoints(goldPoints, silverPoints))
    }
}
