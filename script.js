// script.js
document.addEventListener('DOMContentLoaded', () => {
    const musicItems = document.querySelectorAll('.music-item');
    const token = 'YOUR_SPOTIFY_API_TOKEN'; // Substitua pelo seu token de acesso à API do Spotify

    musicItems.forEach(item => {
        const musicId = item.getAttribute('data-id');
        fetch(`https://api.spotify.com/v1/tracks/${musicId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const img = document.createElement('img');
            img.src = data.album.images[0].url;

            const title = document.createElement('p');
            title.textContent = data.name;

            const artist = document.createElement('p');
            artist.textContent = data.artists.map(artist => artist.name).join(', ');

            const duration = document.createElement('p');
            const minutes = Math.floor(data.duration_ms / 60000);
            const seconds = ((data.duration_ms % 60000) / 1000).toFixed(0);
            duration.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('music-info');
            infoDiv.appendChild(title);
            infoDiv.appendChild(artist);
            infoDiv.appendChild(duration);

            item.appendChild(img);
            item.appendChild(infoDiv);
        })
        .catch(error => console.error('Error fetching track data:', error));
    });
});
