import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { search, getSearchTerm, addTrackToPlaylist } from '../actions';
import request from 'superagent';

class UserSearch extends Component {
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
        let currentPlaylistId = this.props.currentPlaylist.value._id;

        this.props.dispatch(addTrackToPlaylist(currentPlaylistId, track));
    }

    render() {
        let searchResults = this.props.search.value.searchResults;

        let searchResultsSongs = searchResults ?
            searchResults.map((track, index) => {
                if (track.title) {
                    return (
                        <div key={index}>
                            <p>{track.artist} - {track.title}</p>
                            <audio key={index} preload="none" controls>
                                <source src={track.url}/>
                            </audio>

                            <button
                                className="btn btn-primary inline-block"
                                onClick={this.handleBtnAddSong.bind(this, track)}
                            >Add song</button>
                        </div>
                    )
                }
            }) : '';

        let searchResultsBlock = searchResults && searchResults.length ?
            (<div className="col-sm-12">Search results: {searchResultsSongs} </div>) : <span />;

        return (
            <div className="mb50 row">
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

                {searchResultsBlock}
            </div>
        );
    }
}

UserSearch = connect(state => state)(UserSearch);

export default UserSearch;