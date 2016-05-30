import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { getUserTracks } from '../actions';

class UserSongs extends Component {
    componentDidMount() {
        this.getTracks();
    }

    getTracks() {
        VK.api('audio.get',{
            owner_id: 21040845,
            count: 20
        }, (data) => {
            if (data.response) {
                this.props.dispatch(getUserTracks(data.response));
            }
        });
    }

    render() {
        let tracks = this.props.tracks.map((track, index) => {
                if (track.title) {
                    return (
                        <div key={index}>
                            <p>{track.artist} - {track.title}</p>
                            <audio key={index} preload="none" controls>
                                <source src={track.url}/>
                            </audio>
                        </div>
                    )
                }

            return <span key={index} />
        });

        return (
            <div className="row">
                <div className="col-xs-4 text-left">
                    <p>My tracks</p>

                    {tracks}
                </div>
            </div>
        );
    }
}

UserSongs = connect(state => state)(UserSongs);

export default UserSongs;