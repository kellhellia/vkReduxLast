import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import {
    getSearchTerm,
    search,
    getCurrentPlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    handleFriendsModalOpen,
    handleFriendsModalClose
} from '../actions';

import Modal from 'react-modal';
import CheckedFriend from './CheckedFriend';

class PlaylistEdit extends Component {
    componentDidMount() {
        let playlistId = this.props.params.playlistId;
        this.props.dispatch(getCurrentPlaylist(playlistId));
    }

    handleInputChange(e) {
        this.props.dispatch(getSearchTerm(e.target.value));
    }

    handleSearch(e) {
        e.preventDefault();

        let searchTerm = this.props.search.value.searchTerm;

        if (searchTerm.length !== 0) {
            this.props.dispatch(search(searchTerm));
        }
    }

    handleAddSong(track) {
        let playlistId = this.props.params.playlistId;

        this.props.dispatch(addTrackToPlaylist(playlistId, track));
    }

    handleRemoveTrack(trackId) {
        let playlistId = this.props.params.playlistId;
        this.props.dispatch(removeTrackFromPlaylist(playlistId, trackId));
    }

    handleFriendsModalOpen() {
        this.props.dispatch(handleFriendsModalOpen());
    }

    handleFriendsModalClose() {
        this.props.dispatch(handleFriendsModalClose());
    }

    render() {
        const customStyles = {
          overlay : {
            position: 'fixed',
            backgroundColor: 'rgba(0, 0, 0, .8)'
          },
          content : {
            top: '70px',
            left: '30%',
            right: 'auto',
            bottom: 'auto',
            backgroundColor: '#fff',
            border: 0,
            borderRadius: 0,
            width: '40%',
            height: '500px',
            color: 'black',
            paddingTop: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingBottom: '0px'
          }
        };

        let searchResults = this.props.search.value.searchResults;

        let searchResultsSongs = searchResults ?
            searchResults.map((track, index) => {
                if (track.title) {
                    return (
                        <div className="row form-group" key={index}>
                            <div className="col-xs-9">
                                <p>{track.artist} - {track.title}</p>
                            </div>

                            <div className="col-xs-2">
                                <button
                                    className="btn btn-primary inline-block"
                                    onClick={this.handleAddSong.bind(this, track)}
                                >Add song</button>
                            </div>
                        </div>
                    )
                }
            }) : '';

        let searchResultsBlock = searchResults && searchResults.length ?
            (<div className="col-sm-12">Search results: {searchResultsSongs} </div>) : <span />;

        let fetchStatus = this.props.currentPlaylist.fetchStatus.value;
        let fetchStatusFriends = this.props.user.fetchStatusFriends.value;
        let fetchStatusPlaylist = this.props.currentPlaylist.fetchStatus.value;
        let friendsModalOpen = this.props.app.friendsModalOpen;

        let friendsFromVk = this.props.user.friends;
        let friendsFromPlaylist = this.props.currentPlaylist.value.friends;

        let lol = (fetchStatusFriends === 'LOADED' && fetchStatusPlaylist === 'LOADED') ?
            friendsFromVk.map((friend, index) => {
                return (
                    <CheckedFriend
                        key={index}
                        friend={friend}
                        checked={friendsFromPlaylist.length && friendsFromPlaylist.indexOf(friend.uid) != -1}
                    />
                )
            }) : <span />;

        return (
            <div className="playlist-edit">
                <i className="playlist-edit-cog glyphicon glyphicon-cog" onClick={::this.handleFriendsModalOpen}></i>

                <Modal
                    isOpen={friendsModalOpen}
                    onRequestClose={::this.handleFriendsModalClose}
                    style={customStyles}
                >
                    <h5>Кто может слушать плейлист: </h5>

                    <div className="container-fluid">
                        <div className="row mb50">
                            {
                                fetchStatusFriends === 'LOADING' && (
                                    <div>Loading friends...</div>
                                )
                            }
                            {
                                fetchStatusFriends === 'FAILED' && (
                                    <div>Loading friends failed</div>
                                )
                            }
                            {lol}
                        </div>
                    </div>
                </Modal>

                <div className="row">
                    <div className="col-sm-10">
                        <form onSubmit={::this.handleSearch}>
                            <input
                                className="search__input form-control"
                                placeholder="Введите исполнителя/название трека"
                                onChange={::this.handleInputChange}
                            />
                        </form>
                    </div>

                    <div className="col-sm-2">
                        <button
                            type="submit"
                            className="btn btn-primary text-uppercase"
                            onClick={::this.handleSearch}
                        >Search</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-6">
                        <div className="mb50 row">
                            <h4>Search results:</h4>
                            {searchResultsBlock}
                        </div>
                    </div>

                    <div className="col-xs-6">
                        <h4>Playlist songs:</h4>

                        {
                            fetchStatus === 'LOADING' && (
                                <div>Loading songs...</div>
                            )
                        }
                        {
                            fetchStatus === 'FAILED' && (
                                <div>Loading songs failed</div>
                            )
                        }
                        {
                            fetchStatus === 'LOADED' && (
                                this.props.currentPlaylist.value.songs.map((track, index) => {
                                    let trackId = track.trackId;

                                    return (
                                        <div className="row form-group" key={index}>
                                            <div className="col-xs-10">
                                                <span>{track.artist} - {track.title}</span>
                                            </div>
                                            <div className="col-xs-2">
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={this.handleRemoveTrack.bind(this, {trackId})}
                                                >Remove track</button>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                        </div>
                    </div>
            </div>
        )

    }
}

PlaylistEdit = connect(state => state)(PlaylistEdit);

export default PlaylistEdit;