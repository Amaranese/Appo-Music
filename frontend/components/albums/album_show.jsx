//ext
import React, { Component } from "react";
import { Link } from "react-router-dom";
//int - components
import Loading from "../main/loading";
import TrackListItem from "../tracks/track_list_item";
import TrackMenu from "../tracks/track_menu";
//int - utils
import * as icons from "../../utils/icons";
import { dateFormatter, timeAdder } from "../../utils/various";

class AlbumShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            externalSongClick: false,
            selectedTrackId: null,
            hoveredTrackId: null,
            menuTrackId: null,
        };
    }

    handlePlay() {
        const { hoveredTrackId } = this.state;
        const { tracks, addTracks } = this.props;

        if (hoveredTrackId) {
            addTracks(tracks.filter((track) => track.id >= hoveredTrackId));
        } else {
            addTracks(tracks);
        }
    }

    handleAdd() {
        if (this.props.currentUser) {
            this.props.tracks.forEach((track) => {
                !track.saved ? this.props.saveTrack(track.id) : "";
            });
        } else {
            this.props.openSigninModal("signin");
        }
    }

    handleRemove() {
        if (this.props.currentUser) {
            this.props.tracks.forEach((track) => {
                track.saved ? this.props.unsaveTrack(track.id) : "";
            });
        } else {
            this.props.openSigninModal("signin");
        }
    }

    handleMenuOpen() {
        const { hoveredTrackId } = this.state;
        this.setState({ menuTrackId: hoveredTrackId });
    }

    handleMenuClose() {
        this.setState({ menuTrackId: null });
    }

    componentDidMount() {
        this.props
            .getAlbumDetails(this.props.match.params.albumId)
            .then((res) => {
                this.setState({ loading: false });
                document.title = `${this.props.album.title} on Appo Music`;
            });

        if (this.props.selectedTrackId) {
            this.setState({
                externalSongClick: true,
                selectedTrackId: this.props.selectedTrackId,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.currentUser != prevProps.currentUser ||
            prevProps.match.params.albumId !== this.props.match.params.albumId
        ) {
            this.setState({ loading: true });
            this.props
                .getAlbumDetails(this.props.match.params.albumId)
                .then((res) => {
                    this.setState({ loading: false });
                    document.title = `${this.props.album.title} on Appo Music`;
                });
        }

        if (this.state.externalSongClick && !this.state.loading) {
            document.querySelector(".track-row.selected").scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
            this.setState({ externalSongClick: false });
        }
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }

        const { album, tracks, artist } = this.props;
        const albumSaved = this.props.tracks.every((track) => track.saved);

        const trackItems = tracks.map((track) => {
            let trackClasses, trackMenu;
            this.state.selectedTrackId == track.id
                ? (trackClasses = "track-row selected")
                : (trackClasses = "track-row");

            this.state.menuTrackId == track.id
                ? (trackMenu = (
                      <TrackMenu
                          trackId={track.id}
                          location={"album"}
                          handleMenuClose={this.handleMenuClose.bind(this)}
                      />
                  ))
                : (trackMenu = "");

            return (
                <div
                    className={trackClasses}
                    key={track.id}
                    onClick={() => this.setState({ selectedTrackId: track.id })}
                    onMouseEnter={() =>
                        this.setState({ hoveredTrackId: track.id })
                    }
                    onMouseLeave={() => this.setState({ hoveredTrackId: null })}
                    onDoubleClick={this.handlePlay.bind(this)}
                >
                    {trackMenu}
                    <TrackListItem
                        location={"album"}
                        track={track}
                        hovered={this.state.hoveredTrackId == track.id}
                        selected={this.state.selectedTrackId == track.id}
                        handlePlay={this.handlePlay.bind(this)}
                        handleMenuOpen={this.handleMenuOpen.bind(this)}
                    />
                </div>
            );
        });

        return (
            <div className="album-container">
                <div className="album-cover-container">
                    <img className="album-cover" src={album.url} />
                </div>
                <div className="album-header-tracks">
                    <div className="album-header">
                        <h1>{album.title}</h1>
                        <h2>
                            <Link to={`/artists/${artist.id}`}>
                                {artist.name}
                            </Link>
                        </h2>
                        <h3>
                            {album.genre} • {album.releaseDate.slice(0, 4)}
                        </h3>
                        <div className="album-buttons">
                            <div
                                className="btn"
                                onClick={this.handlePlay.bind(this)}
                            >
                                {icons.play("icon white")}
                                Play
                            </div>
                            {albumSaved ? (
                                <div
                                    className="btn"
                                    onClick={this.handleRemove.bind(this)}
                                >
                                    {icons.trash("icon white")}
                                    Remove
                                </div>
                            ) : (
                                <div
                                    className="btn"
                                    onClick={this.handleAdd.bind(this)}
                                >
                                    {icons.add("icon white")}
                                    Add
                                </div>
                            )}
                        </div>
                        <div className="text-container">
                            <span className="text-cutoff">
                                <p>
                                    <strong>About</strong>
                                    {album.description}
                                </p>
                                <button
                                    className="more pointer"
                                    onClick={() =>
                                        this.props.openTextModal({
                                            title: album.title,
                                            sub: artist.name,
                                            text: album.description,
                                        })
                                    }
                                >
                                    MORE
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className="tracks-list">{trackItems}</div>
                    <div className="album-meta">
                        <p>
                            {tracks.length} SONGS,{" "}
                            {timeAdder(
                                Object.values(tracks).map(
                                    (track) => track.duration
                                )
                            ).toUpperCase()}
                        </p>
                        <p>
                            RELEASED{" "}
                            {dateFormatter(album.releaseDate).toUpperCase()}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default AlbumShow;
