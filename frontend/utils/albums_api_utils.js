export const getAllAlbums = () =>
    $.ajax({
        url: "/api/albums/",
        method: "GET",
    });

export const getUserAlbums = () =>
    $.ajax({
        url: "/api/albums/",
        method: "GET",
        data: { request_type: "user" },
    });

export const getAlbumDetails = (albumId) =>
    $.ajax({
        url: `/api/albums/${albumId}`,
        method: "GET",
    });

export const getAlbumTracks = (albumId) =>
    $.ajax({
        url: `/api/albums/${albumId}/tracks`,
        method: "GET",
    });

export const getSavedAlbumTracks = (albumId) =>
    $.ajax({
        url: `/api/albums/${albumId}/tracks`,
        method: "GET",
        data: { request_type: "user" },
    });
