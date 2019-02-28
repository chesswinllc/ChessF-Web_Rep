import * as React from 'react';

export interface IInputProps {
    name: string,
    className?: string,
    type?: string
}

export default class Input extends React.Component<IInputProps, any> {

    private input: any;

    public render() {
        this.input;
        let { name, className, type } = this.props;

        type = type ? type : '';

        return (
            <div className={'input ' + (className)}>
                <div className='input__name'>{name}</div>
                <input ref={ref => this.input = ref} type={type} className='input__input' />
            </div>
        );
    }
}
