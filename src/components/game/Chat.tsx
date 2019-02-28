import * as React from 'react';
import { connect } from 'react-redux';
import { IReduxStore } from 'src/redux';
import ChatMessageComponent from './ChatMessage';
import ChatMessage from 'src/model/ChatMessage';
import User from 'src/model/User';
import { sendChatMessage } from 'src/services/GameService';

export interface IChatProps {
    chatMessages: ChatMessage[],
    opponent: User,
    userId: string,
    gameId: string
}

const Chat = class extends React.Component<IChatProps, any> {

    private input: any;
    private messages: HTMLDivElement;

    componentDidUpdate(prevProps: IChatProps, prevState: any) {
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    public render() {

        return (
            <div className='chat'>
                <div className='chat__header'>{this.props.opponent.name}</div>

                <div ref={(ref: any) => this.messages = ref} className='chat__content'>
                    {this.renderMessages()}
                </div>

                <input ref={ref => this.input = ref} onKeyPress={this.handleKeyPress} className='chat__input' placeholder='Type a message here' />
            </div>
        );
    }

    private renderMessages = () => {
        return this.props.chatMessages.map((chatItem, i) => {
            const sent = this.props.userId == chatItem.userId ? true : false;

            return <ChatMessageComponent key={i} sent={sent} message={chatItem.message} />
        })
    }

    private handleKeyPress = (event: any) => {
        if (event.key == 'Enter') {

            if (!this.input.value) {
                return;
            }
            sendChatMessage(this.props.gameId, this.props.userId, this.input.value);
            this.input.value = '';
        }
    }
}



const mapStateToProps = (state: IReduxStore) => {

    return {
        opponent: state.game.opponent,
        chatMessages: state.game.chatMessages,
        userId: state.user.id,
        gameId: state.game.id
    }
}


export default connect(mapStateToProps)(Chat)