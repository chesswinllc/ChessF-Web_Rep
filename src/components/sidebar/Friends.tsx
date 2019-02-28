import * as React from 'react';
import { connect } from 'react-redux';
import { IReduxStore } from 'src/redux';
import Friend from 'src/model/Friend';
import FriendItem from './FriendItem';
import Loader from '../common/Loader';
import { getAllFriends } from 'src/services/FriendService';
import User from 'src/model/User';
import PreGame from 'src/model/PreGame';


export interface IFriendsProps {
    user: User,
    preGame: PreGame
}

const friendsMock: Friend[] = [];
const Friends = class extends React.Component<IFriendsProps, any> {

    public state = { loading: false, friends: friendsMock }


    public componentDidMount() {
        this.refreshFriends();
    }

    public render() {

        const { loading, friends } = this.state;

        return (
            <div>
                <div className='sidebar__points-lbl' >
                    <span>FRIENDS({friends.length})</span>
                    {loading ?
                        <Loader width={15} height={15} borderWidth={1} /> :
                        <img onClick={this.refreshFriends} className='sidebar__points-lbl-i' src={require('../../assets/icons/refresh.svg')} />
                    }
                </div>

                {this.renderFriends()}
            </div>
        );
    }

    private renderFriends = () => {
        return this.state.friends.map((friend: Friend, i) => {
            return <FriendItem key={friend.id} friend={friend} user={this.props.user} preGame={this.props.preGame} />
        })
    }

    private refreshFriends = () => {
        if (this.state.loading) return;

        this.setState({ loading: true });
        getAllFriends(this.props.user.id || '', (error: string, friends: Friend[]) => {
            if (error) {
                this.setState({ loading: false })
            } else {
                this.setState({ loading: false, friends })
            }

        })
    }
}


const mapStateToProps = (state: IReduxStore) => {

    return {
        user: state.user,
        preGame: state.preGame
    }
}

export default connect(mapStateToProps)(Friends);