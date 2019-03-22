import * as React from 'react';

export interface ICardInputProps {
    name?: string,
    value?: string
    dropDown?: boolean,
    steperValue?: number,
    className?: string,
    items?: string[],
    onItemClicked?: (item: string) => void,
    inputClassName?: string,
    prefix?: string,
    readOnly?: boolean
}

export default class CardInput extends React.Component<ICardInputProps, any> {

    public state = { dropdown: false, item: '' }


    componentWillMount() {
        const prefix = this.props.prefix || '';
        const value = this.props.value || '';

        this.setState({ item: (prefix + value) });
    }


    public render() {
        const { name, dropDown, className, inputClassName, readOnly } = this.props;
        const { dropdown, item } = this.state;

        return (
            <div onClick={this.onClick} className={'card-input ' + (className || '')}>
                {name && <div className='card-input__name'>{name}</div>}
                <input
                    onChange={this.onInputChange}
                    value={item}
                    readOnly={dropDown || readOnly}
                    className={'card-input__input ' + (dropDown ? 'pointer ' : '') + (inputClassName || '')} />

                {dropdown && <div className='card-input__dropdown'>
                    {this.renderItems()}
                </div>}


                {dropDown && <img className='card-input__i' src={require('../../assets/icons/down-arrow.svg')} />}
            </div>
        );
    }

    private renderItems = () => {
        if (!this.props.items) { return; }

        return this.props.items.map((item, i) => {
            return <div onClick={() => this.itemClicked(item)} className='card-input__dropdown-item'>{item}</div>
        })
    }

    private onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ item: event.currentTarget.value });
    }


    private itemClicked = (item: string) => {
        if (this.props.onItemClicked) {
            this.props.onItemClicked(item);
        }

        const prefix = this.props.prefix || '';

        this.setState({ item: (prefix + item) });
    }

    private onClick = () => {
        if (this.props.dropDown) {
            this.setState({ dropdown: !this.state.dropdown });
        }
    }
}
