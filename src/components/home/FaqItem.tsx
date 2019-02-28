import * as React from 'react';

export interface IFaqItemProps {
    title: string,
    text: string
}

export default class FaqItem extends React.Component<IFaqItemProps, any> {
    public render() {
        const { title, text } = this.props;
        return (
            <div className='faq-item'>
                <div className='faq-item__row'>
                    <span className='faq-item__char'>Q</span>
                    <div className='faq-item__title'>{title}</div>
                </div>

                <div className='faq-item__row'>
                    <span className='faq-item__char faq-item__char--q'>A</span>
                    <div className='faq-item__text'>{text}</div>
                </div>
            </div>
        );
    }
}
