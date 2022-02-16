//ext
import React, { Component } from "react";
import { connect } from "react-redux";
//int
import {
    addTrackToPlaylist,
    removeTrackFromPlaylist,
} from "../../actions/playlist_actions";

class TrackMenu extends Component {
    constructor(props) {
        super(props);
    }

    handleAdd(trackId, playlistId) {
        this.props.addTrackToPlaylist(trackId, playlistId);
        this.props.handleMenuClose();
    }

    handleRemove(trackId, playlistId) {
        this.props.removeTrackFromPlaylist(trackId, playlistId);
    }

    render() {
        const { trackId, playlistId, location, playlists } = this.props;
        const { handleMenuClose } = this.props;

        if (location === "album") {
            const playlistList = playlists
                .sort((a, b) => (a.title > b.title ? 1 : -1))
                .map((playlist) => (
                    <li
                        className="playlist-list-item pointer"
                        key={playlist.id}
                        onClick={() => this.handleAdd(trackId, playlist.id)}
                    >
                        {playlist.title}
                    </li>
                ));

            var menuOptions = (
                <React.Fragment>
                    <li className="track-menu-item">Add to Playlist</li>
                    <ul className="playlist-list">{playlistList}</ul>
                </React.Fragment>
            );
        } else if (location === "playlist") {
            var menuOptions = (
                <React.Fragment>
                    <li
                        className="track-menu-item playlist pointer"
                        onClick={() => this.handleRemove(trackId, playlistId)}
                    >
                        Remove from playlist
                    </li>
                </React.Fragment>
            );
        }

        return (
            <ul className="track-menu" onMouseLeave={handleMenuClose}>
                {menuOptions}
            </ul>
        );
    }
}

const mapSTP = ({ entities }) => ({
    playlists: Object.values(entities.playlists),
});

const mapDTP = (dispatch) => ({
    addTrackToPlaylist: (trackId, playlistId) =>
        dispatch(addTrackToPlaylist(trackId, playlistId)),
    removeTrackFromPlaylist: (trackId, playlistId) =>
        dispatch(removeTrackFromPlaylist(trackId, playlistId)),
});

export default connect(mapSTP, mapDTP)(TrackMenu);
