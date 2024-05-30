export namespace ApiURLs {
  export function songContent(path: string): string {
    return path;
  }

  export function like(songId: number): string {
    return `songs/${songId}/like`;
  }

  export function unlike(songId: number): string {
    return `songs/${songId}/unlike`;
  }

  export function playlistsAddSong(playlistId: number, songId: number): string {
    return `playlists/${playlistId}/add/${songId}`;
  }

  export function playlistsRemoveSong(
    playlistId: number,
    songId: number
  ): string {
    return `playlists/${playlistId}/remove/${songId}`;
  }

  export function removePlaylist(playlistId: number): string {
    return `playlists/${playlistId}`;
  }
}
