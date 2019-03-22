import * as React from 'react';
import { connect } from 'react-redux';
import Nav from '../common/Nav';
import Button from '../common/Button';
import RetrieveTab from '../conversion/RetrieveTab';
import AddTab from '../conversion/AddTab';
import User from 'src/model/User';
import { IReduxStore } from 'src/redux';

export interface IConversionProps {
    user: User
}

const Conversion = class extends React.Component<IConversionProps, any> {

    public state = { tab: 0 }

    public render() {

        const { tab } = this.state;

        return (
            <div className='conversion'>

                <Nav>
                    <span style={{ minWidth: 70 }} />
                    <div className='nav__logo'>
                        <img className='nav__logo' src={require('../../assets/imgs/logo.png')} />
                    </div>
                    <Button text='Log out' className='btn--white' />
                </Nav>

                <div className='conversion__content'>

                    <div className='gold-banner'>
                        <span>GOLD COINS</span>
                        <span className='gold-banner__points'>{this.props.user.gold_points}</span>

                        <img className='avatar mrl-a' src={this.props.user.profile_picture} />
                    </div>

                    <div className='conversion__tab-header'>
                        <div onClick={() => this.changeTab(0)}
                            className={'conversion__tab-header-item mrr-10px ' + (tab == 0 ? 'conversion__tab-header-item--active' : '')}>Add</div>

                        <div onClick={() => this.changeTab(1)}
                            className={'conversion__tab-header-item mrl-10px ' + (tab == 1 ? 'conversion__tab-header-item--active' : '')}>Retrieve</div>
                    </div>

                    <div className='divider divider--hor divider--conversion mrt-20px mrb-20px' />


                    {(tab == 0) && <AddTab user={this.props.user} />}
                    {(tab == 1) && <RetrieveTab user={this.props.user} />}

                </div>
            </div>
        );
    }

    private changeTab = (tab: number) => {
        if (this.state.tab != tab) {
            this.setState({ tab });
        }
    }
}




const mapStateToProps = (state: IReduxStore) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Conversion);