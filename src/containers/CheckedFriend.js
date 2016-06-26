import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';

import {
    addFriendToPlaylist,
    removeFriendFromPlaylist
} from '../actions';

class CheckedFriend extends Component {
    handleAddFriendToPlaylist(friendId) {
        let playlistId = this.props.currentPlaylist.value._id;

        this.props.dispatch(addFriendToPlaylist(playlistId, friendId));
    }

    render() {
        let friendsFromPlaylist = this.props.currentPlaylist.value.friends;
        let { friend, checked, addFriendToPlaylist } = this.props;

        let checkedFriend = checked ? 'checked' : '';

        return (
            <div
                onClick={this.handleAddFriendToPlaylist.bind(this, friend.uid)}
                className="row form-group"
            >
                <div className="col-xs-1">
                    <img
                        src={friend.photo_100}
                        className="img-circle center-block"
                        width="30"
                    />
                </div>
                <div className="col-xs-9">{friend.first_name} {friend.last_name}</div>
                <div className="col-xs-2">{
                    friendsFromPlaylist.map((playlistFriendId, index) => {
                        if (friend.uid === playlistFriendId) {
                            return (
                                <div className="text-right" key={index}>
                                    <i className="glyphicon glyphicon-ok green"></i>
                                </div>
                            )
                        }
                        return <span key={index} />
                    })
                }</div>
            </div>
        );
    }
}

CheckedFriend = connect(state => state)(CheckedFriend);

export default CheckedFriend;