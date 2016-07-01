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

    handleRemoveFriendFromPlaylist(friendId) {
        let playlistId = this.props.currentPlaylist.value._id;

        this.props.dispatch(removeFriendFromPlaylist(playlistId, friendId));
    }

    render() {
        let { friend, checked } = this.props;

        let checkedFriend = checked ?
            <i className="glyphicon glyphicon-remove" /> :
            <i className="glyphicon glyphicon-plus" />;

        let checkedFunc = checked ?
            this.handleRemoveFriendFromPlaylist.bind(this, friend.uid) :
            this.handleAddFriendToPlaylist.bind(this, friend.uid);

        return (
            <div onClick={checkedFunc} className="row form-group">
                <div className="col-xs-1">
                    <img
                        src={friend.photo_100}
                        className="img-circle center-block"
                        width="30"
                    />
                </div>
                <div className="col-xs-9">{friend.first_name} {friend.last_name}</div>
                <div className="col-xs-2">{checkedFriend}</div>
            </div>
        );
    }
}

CheckedFriend = connect(state => state)(CheckedFriend);

export default CheckedFriend;