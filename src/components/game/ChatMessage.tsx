import * as React from 'react';

export interface IChatMessageProps {
    sent: boolean,
    message: string
}

export default class ChatMessage extends React.Component<IChatMessageProps, any> {
    public render() {
        const { sent, message } = this.props;


        return (
            <div className={'chat__message ' + (sent ? 'chat__message--sent' : '')}>
                {message}
            </div>
        );
    }
}
