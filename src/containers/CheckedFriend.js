import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';

import { addFriendToPlaylist } from '../actions';

class CheckedFriend extends Component {
    handleAddFriendToPlaylist(friendId) {
        // let playlistId = this.props.currentPlaylist.value._id;

        // this.props.dispatch(addFriendToPlaylist(playlistId, friendId));

        console.log('add');
    }

    handleRemoveFriendFromPlaylist(friendId) {
        // let playlistId = this.props.currentPlaylist.value._id;

        // this.props.dispatch(addFriendToPlaylist(playlistId, friendId));

        console.log('remove');
    }

    render() {
        let { friend, checked } = this.props;

        let checkedFriend = checked ? 'checked' : 'huy';

        return (
            <div className="row form-group">
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