import * as React from 'react';
import ShopCard from './ShopCard';
import { store } from 'src/redux';
import { updateUserPoints } from 'src/redux/actions/ActionCreators';
import User from 'src/model/User';

export interface IAddTabProps {
    user: User
}

export default class AddTab extends React.Component<IAddTabProps, any> {
    public render() {
        return (
            <div className='conversion__tab-item'>
                <h3 className='conversion__title'>Gold Store</h3>

                <div className='conversion__shop-items'>
                    <ShopCard
                        title='BISHOP'
                        points={10}
                        btnText='Get for $10.50'
                        img='coins-gold'
                        addPoints={this.addPoints} />

                    <ShopCard
                        title='BISHOP'
                        points={25}
                        btnText='Get for $25.50'
                        img='coins-gold'
                        addPoints={this.addPoints} />

                    <ShopCard
                        title='BISHOP'
                        points={50}
                        btnText='Get for $49.50'
                        img='coins-gold'
                        addPoints={this.addPoints} />

                    <ShopCard
                        title='BISHOP'
                        points={75}
                        btnText='Get for $75.50'
                        img='coins-gold'
                        addPoints={this.addPoints} />


                    <ShopCard
                        title='BISHOP'
                        points={100}
                        btnText='Get for $100.50'
                        img='coins-gold'
                        addPoints={this.addPoints} />


                    <ShopCard
                        title='BISHOP'
                        points={200}
                        btnText='Get for $150.50'
                        img='coins-gold'
                        addPoints={this.addPoints} />

                </div>
            </div>
        );
    }

    private addPoints = (points: number) => {
        let goldPoints = this.props.user.gold_points;
        let silverPoints = this.props.user.silver_points;

        goldPoints += points;

        store.dispatch(updateUserPoints(goldPoints, silverPoints))
    }
}
