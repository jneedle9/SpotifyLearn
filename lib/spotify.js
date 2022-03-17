import SpotifyWebApi from "spotify-web-api-node";


const scopes = [
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-email',
    'streaming',
    'user-read-private',
    'user-library-read',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-follow-read',
].join(',');


//pass this into website to change url

const params = {
    scope: scopes,
};
// giving scopes to convert to URL formatting
const queryParamString = new URLSearchParams(params);
// authorizing all these things on login
const LOGIN_URL = 'https://accounts.spotify.com/authorize?' + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyApi
export {LOGIN_URL}