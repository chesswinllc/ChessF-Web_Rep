import * as React from 'react';
import Button from '../common/Button';
import { connect } from 'react-redux';
import { IReduxStore } from 'src/redux';
import { updateUserPoints } from 'src/services/PointService';

export interface IShopCardProps {
    title?: string,
    points?: number,
    btnText?: string,
    img?: string,
    addPoints?: (points: number) => void,
    userId: string
}

const ShopCard = class extends React.Component<IShopCardProps, any> {
    public state = { loading: false }

    public render() {

        const { title, points, btnText, img } = this.props
        const { loading } = this.state;

        return (
            <div className='shop-card'>
                <div className='shop-card__col1'>
                    <img className='shop-card__img' src={require('../../assets/icons/' + img + '.svg')} />

                    <span className='shop-card__price' >
                        <span>{points}</span>
                        <img className=' mrl-5px' src={require('../../assets/icons/coins-gold.svg')} />
                    </span>
                </div>

                <div className='shop-card__col2'>
                    <span className='shop-card__title'>{title}</span>
                    <Button loading={loading} onClick={this.addPoints} text={btnText || ''} className='btn-green-gradient' />
                </div>
            </div>
        );
    }

    private addPoints = () => {
        if (!this.props.points) { return }

        this.setState({ loading: true });

        updateUserPoints(this.props.userId, this.props.points || 0, (success: boolean) => {
            this.setState({ loading: false });

            if (this.props.addPoints) {
                this.props.addPoints(this.props.points || 0);
            }

        })

    }
}


const mapStateToProps = (state: IReduxStore) => {
    return {
        userId: state.user.id
    }
}

export default connect(mapStateToProps)(ShopCard);