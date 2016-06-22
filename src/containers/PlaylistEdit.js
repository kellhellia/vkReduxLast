import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import request from 'superagent';
import {
    getSearchTerm,
    search,
    getCurrentPlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist
} from '../actions';

class PlaylistEdit extends Component {
    componentDidMount() {
        let playlistId = this.props.params.playlistId;
        this.props.dispatch(getCurrentPlaylist(playlistId));
    }

    handleInputChange(e) {
        this.props.dispatch(getSearchTerm(e.target.value));
    }

    handleBtnSearch(e) {
        e.preventDefault();

        let searchTerm = this.props.search.value.searchTerm;

        if (searchTerm.length !== 0) {
            this.props.dispatch(search(searchTerm));
        }
    }

    handleBtnAddSong(track) {
        let playlistId = this.props.params.playlistId;

        this.props.dispatch(addTrackToPlaylist(playlistId, track));
    }

    handleRemoveTrackBtn(trackId) {
        let playlistId = this.props.params.playlistId;
        this.props.dispatch(removeTrackFromPlaylist(playlistId, trackId));
    }

    render() {
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
                                    onClick={this.handleBtnAddSong.bind(this, track)}
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

        console.log(this.props.user.friends);
        console.log(this.props.user.fetchStatusFriends);

        return (
            <div>
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
                    {
                        fetchStatusFriends === 'LOADED' && (
                            this.props.user.friends.map((friend, index) => {
                                return (
                                    <a
                                        href={`https://vk.com/id${friend.user_id}`}
                                        key={index}
                                        className="col-xs-2 text-center"
                                        target="blank"
                                    >
                                        <img
                                            src={friend.photo_100}
                                            className="img-circle center-block"
                                            width="30"
                                        />
                                        <div>{friend.first_name} {friend.last_name}</div>
                                    </a>
                                )
                            })
                        )
                    }
                </div>
                <div className="row">
                    <div className="col-sm-10">
                        <form onSubmit={::this.handleBtnSearch}>
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
                            onClick={::this.handleBtnSearch}
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
                                                    onClick={this.handleRemoveTrackBtn.bind(this, {trackId})}
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