import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';

class CheckedFriend extends Component {
    render() {
        let { friend, checked, addFriendToPlaylist } = this.props;

        return (
            <div onClick={addFriendToPlaylist} className="row form-group">
                <div className="col-xs-1">
                    <img
                        src={friend.photo_100}
                        className="img-circle center-block"
                        width="30"
                    />
                </div>
                <div className="col-xs-11">{friend.first_name} {friend.last_name}</div>
            </div>
        );
    }
}

export default CheckedFriend;