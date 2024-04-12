import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, IconButton } from '@mui/material';
import AudioPlayer from './AudioPlayer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const songs = [
  { id: 1, title: "Song 1", artist: "Artist 1", src: "/songs/01.mp3", image: "https://www.musicgrotto.com/wp-content/uploads/2021/12/happy-girl-singing-with-music-notes-in-background-graphic-art.jpg"},
  { id: 2, title: "Song 2", artist: "Artist 2", src: "/songs/02.mp3", image: "https://neurosciencenews.com/files/2023/09/love-song-recognition-neurosicnes.jpg" },
  { id: 3, title: "Song 3", artist: "Artist 3", src: "/songs/03.mp3", image: "https://media.npr.org/assets/img/2020/05/26/homepage-adurand-spotifyplaylist1-e1bb1f9b31eba00eb8a73be98160d80ef455a0f3-s1100-c50.jpg"},
  { id: 4, title: "Song 4", artist: "Artist 4", src: "/songs/04.mp3", image: "https://hips.hearstapps.com/hmg-prod/images/sad-songs-1645822604.png?crop=0.8891849877859206xw:1xh;center,top&resize=1200:*" },
  { id: 5, title: "Song 5", artist: "Artist 5", src: "/songs/04.mp3", image: " https://www.yourtango.com/sites/default/files/image_blog/best-lip-sync-songs.png" },
  { id: 6, title: "Song 6", artist: "Artist 6", src: "PehleBhiMainAnimal320Kbps.mp3", image: "https://t3.ftcdn.net/jpg/03/57/78/64/360_F_357786497_WqQoFdrsF2vmwcUarpOTLbEFpRcYLGIi.jpg" },
 { id: 7, 
  title: "Tu Hai To Mujhe Phir Aur Kya Chahiye", 
  artist: "Unknown", 
  src: "https://www.pagalworld.com.se/siteuploads/files/sfd134/66687/Tu%20Hai%20To%20Mujhe%20Phir%20Aur%20Kya%20Chahiye(PagalWorld.com.se).mp3", 
  image: "https://www.musicgrotto.com/wp-content/uploads/2021/12/happy-girl-singing-with-music-notes-in-background-graphic-art.jpg" }
];

function SongList() {
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);

  const filteredSongs = searchTerm
    ? songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : songs;

  const toggleFavorite = (song) => {
    if (favorites.some(fav => fav.id === song.id)) {
      setFavorites(favorites.filter(fav => fav.id !== song.id));
    } else {
      setFavorites([...favorites, song]);
    }
  };

  const playSong = (song) => {
    setCurrentSong(song.src);
  };
  
  return (
    <div className="song-list">
      <TextField
        label="Search Songs"
        variant="outlined"
        fullWidth
        style={{ margin: '20px 0' }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={() => setFavorites([])} style={{ marginBottom: '20px' }}>
        Clear Favorites
      </Button>
      <Grid container spacing={3} style={{ padding: '20px' }}>
        {filteredSongs.map((song, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="song-card">
              <CardContent>
                <img src={song.image} alt={song.title} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' }} />
                <Typography variant="h5" component="h2">
                  {song.title}
                </Typography>
                <Typography color="textSecondary">
                  {song.artist}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <IconButton
                    variant="contained"
                    color={favorites.some(fav => fav.id === song.id) ? "secondary" : "primary"}
                    onClick={() => toggleFavorite(song)}
                  >
                    {favorites.some(fav => fav.id === song.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <Button variant="contained" color="primary" onClick={() => playSong(song)} style={{ marginLeft: '10px' }}>
                    Play
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {currentSong && <AudioPlayer src={currentSong} title={`${filteredSongs.find(song => song.src === currentSong)?.title} - ${filteredSongs.find(song => song.src === currentSong)?.artist}`} />}

      {favorites.length > 0 && (
        <div>
          <Typography variant="h6" style={{ marginTop: '30px' }}>
            Favorite Songs:
          </Typography>
          <ul>
            {favorites.map(fav => (
              <li key={fav.id}>{fav.title} - {fav.artist}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SongList;
