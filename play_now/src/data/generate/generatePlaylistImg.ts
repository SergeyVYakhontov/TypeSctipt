export function generatePlaylistImg(): string {
  const maxCount = 6;
  const randomIndex = 2 + Math.floor(Math.random() * maxCount);

  return `img/playlists (${randomIndex}).jpg`;
}
