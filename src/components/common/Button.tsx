import * as React from 'react';
import Loader from './Loader';

export interface IButtonProps {
    text: string,
    className?: string,
    onClick?: () => void,
    loading?: boolean,
    icon?: string
}

export default class Button extends React.Component<IButtonProps, any> {
    public render() {
        const { text, className, loading, icon } = this.props;

        if (loading) {
            return (
                <span onClick={this.onClick} className={'btn ' + (className || '')}>
                    <Loader width={20} height={20} />
                </span>)
        }

        return (
            <span onClick={this.onClick} className={'btn ' + (className || '')}>
                {icon && <img className='btn__icon' src={icon} />}
                {text}
            </span>
        );
    }

    private onClick = () => {
        if (!this.props.loading && this.props.onClick) {
            console.log(this.props.loading);
            this.props.onClick();
        }
    }
}
