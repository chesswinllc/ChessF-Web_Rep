import * as React from 'react';
import Input from 'src/components/common/Input';
import Button from 'src/components/common/Button';
import { History } from 'history';
import Footer from 'src/components/common/Footer';
import { loginUser } from 'src/services/CognitoServices';

export interface ILoginProps {
    history: History
}

export default class ILogin extends React.Component<ILoginProps, any> {

    public state = { error: '', loading: false }

    private email: any;
    private password: any;

    public render() {

        const { error, loading } = this.state;

        return (
            <div className='login'>
                <div className='login__content'>

                    <img className='login__logo' src={require('../../assets/imgs/logo.png')} />
                    <div className='divider divider--hor divider--login-form' />

                    <div className='form'>
                        <div className='form__header'>
                            Log in
                        </div>

                        <Input onEnter={this.tryLogin} ref={ref => this.email = ref} name='E-MAIL ADDRESS' className='mrb-20px' />
                        <Input onEnter={this.tryLogin} ref={ref => this.password = ref} name='PASSWORD' className='mrb-30px' type='password' />

                        {error ? <span className='form__error'>{error}</span> : ''}

                        <Button loading={loading} onClick={this.tryLogin} text='Log In' className='btn--gold fw-400' />

                        <div className='form__reset-w'>
                            <div className='divider divider--hor divider--75px' />
                            <span onClick={this.goToReset} className='pointer'>Reset your password</span>
                            <div className='divider divider--hor divider--75px' />
                        </div>

                    </div>

                </div>


                <Footer className='mrt-auto' />

            </div>
        );
    }


    private goToReset = () => {
        this.props.history.push('/reset');
    }

    private tryLogin = () => {
        if (!this.email.input.value || !this.password.input.value) {
            return;
        }

        this.setState({ loading: true });

        loginUser(this.email.input.value.toLowerCase(), this.password.input.value, (error: string) => {
            this.setState({ loading: false, error: error ? error : '' })
        })
    }
}
