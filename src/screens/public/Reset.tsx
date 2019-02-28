import * as React from 'react';
import Input from 'src/components/common/Input';
import Button from 'src/components/common/Button';
import { History } from 'history';
import Footer from 'src/components/common/Footer';
import { forgotPassword } from 'src/services/CognitoServices';

export interface IResetProps {
    history: History
}

export default class Reset extends React.Component<IResetProps, any> {

    public state = { error: '', loading: false }

    private email: any;

    public render() {

        const { error, loading } = this.state;

        return (
            <div className='login'>
                <div className='login__content'>

                    <img className='login__logo' src={require('../../assets/imgs/logo.png')} />
                    <div className='divider divider--hor divider--login-form' />

                    <div className='form'>
                        <div className='form__header'>
                            Reset Password
                        </div>

                        <Input ref={ref => this.email = ref} name='E-MAIL ADDRESS' className='mrb-30px' />

                        {error ? <span className='form__error'>{error}</span> : ''}

                        <Button loading={loading} onClick={this.tryReset} text='Reset' className='btn--gold fw-400' />

                        <div className='form__reset-w'>
                            <div className='divider divider--hor divider--75px' />
                            <span onClick={this.goToLogin} className='pointer'>Alreaday have an account ? </span>
                            <div className='divider divider--hor divider--75px' />
                        </div>

                    </div>

                </div>


                <Footer className='mrt-auto' />

            </div>
        );
    }

    private goToLogin = () => {
        this.props.history.push('/login');
    }

    private tryReset = () => {
        if (!this.email.input.value) return;

        this.setState({ loading: true, error: '' });

        forgotPassword(this.email.input.value, (error: string) => {
            this.setState({ loading: false, error: error ? error : '' });
        })
    }
}
