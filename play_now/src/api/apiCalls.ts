import * as createPlaylistCall from './createPlaylist';
import * as likeCall from './like';
import * as loadPlaylistListCall from './loadPlaylistList';
import * as loginCall from './login';
import * as playlistsAddSongCall from './playlistsAddSong';
import * as playlistsRemoveSongCall from './playlistsRemoveSong';
import * as registerCall from './register';
import * as removePlaylistCall from './removePlaylist';
import * as songContentCall from './songContent';
import * as songsCall from './songs';
import * as unlikeCall from './unlike';

export namespace ApiCalls {
  export import login = loginCall.ApiCalls.login;
  export import register = registerCall.ApiCalls.register;
  export import songs = songsCall.ApiCalls.songs;
  export import songContent = songContentCall.ApiCalls.songContent;
  export import like = likeCall.ApiCalls.like;
  export import unlike = unlikeCall.ApiCalls.unlike;
  export import playlistsAddSong = playlistsAddSongCall.ApiCalls.playlistsAddSong;
  export import playlistsRemoveSong = playlistsRemoveSongCall.ApiCalls.playlistsRemoveSong;
  export import createPlaylist = createPlaylistCall.ApiCalls.createPlaylist;
  export import loadPlaylistList = loadPlaylistListCall.ApiCalls.loadPlaylistList;
  export import removePlaylist = removePlaylistCall.ApiCalls.removePlaylist;
}
