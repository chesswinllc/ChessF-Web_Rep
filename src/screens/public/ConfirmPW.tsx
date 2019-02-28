import * as React from 'react';
import Input from 'src/components/common/Input';
import Button from 'src/components/common/Button';
import { History } from 'history';
import Footer from 'src/components/common/Footer';
import { confirmNewPassword } from 'src/services/CognitoServices';

export interface IConfirmPWProps {
    history: History
}

export default class ConfirmPW extends React.Component<IConfirmPWProps, any> {

    public state = { error: '', loading: false }

    private code: any;
    private pw: any;
    private pw2: any;

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

                        <Input ref={ref => this.code = ref} name='Code' className='mrb-20px' />
                        <Input ref={ref => this.pw = ref} name='New Password' className='mrb-20px' />
                        <Input ref={ref => this.pw2 = ref} name='Verify Password' className='mrb-30px' />

                        {error ? <span className='form__error'>{error}</span> : ''}

                        <Button loading={loading} onClick={this.tryConfirmPw} text='Reset' className='btn--gold fw-400' />

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

    private tryConfirmPw = () => {
        const email = this.props.history.location.state.email;
        const code = this.code.input.value;
        const pw = this.pw.input.value;
        const pw2 = this.pw2.input.value;

        if (pw !== pw2) {
            this.setState({ error: 'Password doesnt match' });
            return;
        }


        this.setState({ loading: true, error: '' });

        confirmNewPassword(email, pw, code, (error: string) => {
            this.setState({ loading: false, error: error ? error : '' });
        })
    }
}
