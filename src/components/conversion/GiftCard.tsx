import * as React from 'react';
import Button from '../common/Button';
import { connect } from 'react-redux';
import { IReduxStore } from 'src/redux';
import { updateUserPoints } from 'src/services/PointService';

export interface IGiftCardProps {
    img?: string,
    btnText?: string,
    title?: string,
    price?: number,
    paragraph?: string,
    priceSign?: string,
    className?: string,
    removePoints?: (points: number) => void,
    userId: string
}

const GiftCard = class extends React.Component<IGiftCardProps, any> {

    public state = { loading: false }

    public render() {

        const { img, btnText, title, price, paragraph, priceSign, className } = this.props;
        const { loading } = this.state;

        return (
            <div className={'gift-card ' + (className || '')}>
                <img className='gift-card__img' src={img} />

                <div className='gift-card__col2'>
                    <span className='gift-card__title'>{title}</span>
                    <span className='gift-card__price'>{(priceSign || '$') + price}</span>
                    <p className='gift-card__p'>{paragraph}</p>
                </div>

                <Button loading={loading} onClick={this.removePoints} text={btnText || ''} className='btn--sidebar-gold fw-400 color-white' />
            </div>
        );
    }


    private removePoints = () => {
        if (!this.props.price) { return }

        this.setState({ loading: true });

        updateUserPoints(this.props.userId, this.props.price || 0, (success: boolean) => {
            this.setState({ loading: false });

            if (this.props.removePoints) {
                this.props.removePoints(this.props.price || 0);
            }

        })

    }
}


const mapStateToProps = (state: IReduxStore) => {
    return {
        userId: state.user.id
    }
}

export default connect(mapStateToProps)(GiftCard);