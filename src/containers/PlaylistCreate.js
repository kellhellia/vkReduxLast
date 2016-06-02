import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';

class PlaylistCreate extends Component {
    render() {
        console.log(this.props.params);
        return <div>User id: {this.props.params.id}</div>
    }
}

export default PlaylistCreate;