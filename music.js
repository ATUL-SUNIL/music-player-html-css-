// Sample song data
const songs = [
    { id: 1, name: "Shape of You", artist: "Ed Sheeran", genre: "Pop", source: "static/songs/shape_of_you.mp3", image: "static/images/shape_of_you.jpeg" },
    { id: 2, name: "Bohemian Rhapsody", artist: "Queen", genre: "Rock", source: "static/songs/bohemian_rhapsody.mp3", image: "static/images/bohemian_rhapsody.jpeg" },
    { id: 3, name: "Smells Like Teen Spirit", artist: "Nirvana", genre: "Grunge", source: "static/songs/smells_like_teen_spirit.mp3", image: "static/images/smells_like_teen_spirit.jpeg" },
    { id: 4, name: "Billie Jean", artist: "Michael Jackson", genre: "Pop", source: "static/songs/billie-jean.mp3", image: "static/images/billie_jean.jpeg" },
    { id: 5, name: "Mockingbird", artist: "Eminem", genre: "Hip Hop", source: "static/songs/mockingbird.mp3", image: "static/images/mockingbird.jpg" }
];

const playlists = [
    { id: 1, name: " Playlist 1", songs: [1] } // Initial playlist example
    // Add more playlists as needed
];

let currentSongIndex = 0; // Track the index of the current song

// Function to render all songs
function renderAllSongs() {
    // Clear existing song list
    document.getElementById("all-songs").innerHTML = `
    <label for="genre-filter">Filter by Genre:</label>
            <select id="genre-filter" onchange="filterByGenre()">
                <option value="all">All Genres</option>
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Grunge">Grunge</option>
                <option value="Hip Hop">Hip Hop</option>
            </select>
    `;

    // Render each song
    songs.forEach(song => {
        const songElement = document.createElement("div");
        songElement.innerHTML = `
            <p>${song.name} - ${song.artist}</p>
            <button onclick="playSong(${song.id})">Play</button>
            <button onclick="addToPlaylist(${song.id})">Add to Playlist</button>
        `;
        document.getElementById("all-songs").appendChild(songElement);
    });
}

// Function to handle the "Display All Songs" button click event
document.getElementById("display-all-songs").addEventListener("click", function() {
    renderAllSongs(); // Call the function to render all songs
});

// Function to filter songs by genre
function filterByGenre() {
    const genre = document.getElementById("genre-filter").value;
    if (genre === "all") {
        // If "All Genres" is selected, render all songs
        renderAllSongs();
    } else {
        // Filter songs by the selected genre
        const filteredSongs = songs.filter(song => song.genre === genre);
        renderFilteredSongs(filteredSongs);
    }
    const dropdown = document.getElementById("genre-filter");
    for (let i = 0; i < dropdown.options.length; i++) {
        if (dropdown.options[i].value === genre) {
            dropdown.selectedIndex = i;
            break;
        }
    }
}

// Function to render filtered songs
function renderFilteredSongs(filteredSongs) {
    const allSongsContainer = document.getElementById("all-songs");
    allSongsContainer.innerHTML = `
    <label for="genre-filter">Filter by Genre:</label>
            <select id="genre-filter" onchange="filterByGenre()">
                <option value="all">All Genres</option>
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Grunge">Grunge</option>
                <option value="Hip Hop">Hip Hop</option>
            </select>
    `; // Clear existing song list

    filteredSongs.forEach(song => {
        const songElement = document.createElement("div");
        songElement.innerHTML = `
            <p>${song.name} - ${song.artist}</p>
            <button onclick="playSong(${song.id})">Play</button>
            <button onclick="addToPlaylist(${song.id})">Add to Playlist</button>
        `;
        allSongsContainer.appendChild(songElement);
    });
}

// Function to play a song
function playSong(songId) {
    const song = songs.find(song => song.id === songId);
    // Logic to play the song
    
    let audioPlayer = document.getElementById("audio-player");
    if (!audioPlayer) {
        // Create the audio player element if it doesn't exist
        audioPlayer = document.createElement("audio");
        audioPlayer.id = "audio-player";
        audioPlayer.controls = true;
        document.getElementById("audiopl").appendChild(audioPlayer);
    }
    // Update song card
    document.getElementById("song-card").innerHTML = `
        <img src="${song.image}" style="width: 250px; height: 250px;" alt="${song.name}">
        <p>${song.name} - ${song.artist}</p>
        <button class="next" onclick="previousSong()"><=</button>
        <button class="next" onclick="nextSong()">=></button>
        <br>
        <button id="addtop" onclick="addToPlaylist(${song.id})">Add to Playlist</button>
    `;

    // Play the selected song
    audioPlayer.style.display = "block";
    audioPlayer.src = song.source;
    audioPlayer.play();
    currentSongIndex = songs.findIndex(s => s.id === songId);
}

// Function to play the next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex].id);
}

// Function to play the previous song
function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex].id);
}

// Function to toggle theme
document.getElementById("toggle-theme").addEventListener("click", function() {
    // Toggle the "dark-theme" class on the body element
    document.body.classList.toggle("dark-theme");
    
    // Update the button text based on the theme
    const themeButton = document.getElementById("toggle-theme");
    if (document.body.classList.contains("dark-theme")) {
        themeButton.textContent = "Light Theme";
    } else {
        themeButton.textContent = "Dark Theme";
    }
});

// Function to render playlists
function renderPlaylists() {
    document.getElementById("playlist").innerHTML = `
    MY PLAYLISTS
    `;
    playlists.forEach(playlist => {
        const playlistElement = document.createElement("div");
        playlistElement.innerHTML = `
            <p>${playlist.name}</p>
             <button onclick="displayPlaylist(${playlist.id})">Display Playlist</button>
            <button onclick="newplaylist()">Create Playlist</button>
        `;
        document.getElementById("playlist").appendChild(playlistElement);
    });
}

// Function to display a playlist
function displayPlaylist(playlistId) {
    const playlist = playlists.find(pl => pl.id === playlistId);
    const playlistSongs = playlist.songs.map(songId => songs.find(song => song.id === songId));
    document.getElementById("all-songs").innerHTML = `
    <label for="genre-filter">Filter by Genre:</label>
            <select id="genre-filter" onchange="filterByGenre()">
                <option value="all">All Genres</option>
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Grunge">Grunge</option>
                <option value="Hip Hop">Hip Hop</option>
            </select>
    `;
    playlistSongs.forEach(song => {
        const songElement = document.createElement("div");
        songElement.innerHTML = `
            <p>${song.name} - ${song.artist}</p>
            <button onclick="playSong(${song.id})">Play</button>
            <button onclick="removeFromPlaylist(${playlist.id}, ${song.id})">Remove from Playlist</button>
            `;
        document.getElementById("all-songs").appendChild(songElement);
    });
}

// Function to remove a song from a playlist
function removeFromPlaylist(playlistId, songId) {
    const playlist = playlists.find(pl => pl.id === playlistId);
    const songIndex = playlist.songs.indexOf(songId);
    if (songIndex !== -1) {
        playlist.songs.splice(songIndex, 1);
        alert("Song removed from playlist successfully!");
        // Re-render the playlist after removing the song
        displayPlaylist(playlistId);
    } else {
        alert("Song not found in the playlist!");
    }
}

// Function to add a song to a playlist
function addToPlaylist(songId) {
    // Prompt the user to select an existing playlist or create a new one
    const playlistName = prompt("Enter the name of the playlist or type 'New Playlist' to create a new one:");
    
    if (!playlistName) {
        // If the user cancels the prompt, do nothing
        return;
    }
    
    let playlist;
    
    if (playlistName.toLowerCase() === 'new playlist') {
        // Create a new playlist
        const newPlaylistName = prompt("Enter the name of the new playlist:");
        
        if (!newPlaylistName) {
            // If the user cancels the prompt, do nothing
            return;
        }
        
        // Generate a unique ID for the new playlist
        const newPlaylistId = playlists.length > 0 ? Math.max(...playlists.map(pl => pl.id)) + 1 : 1;
        
        playlist = { id: newPlaylistId, name: newPlaylistName, songs: [] };
        playlists.push(playlist);
        renderPlaylists(); // Update the playlists section with the new playlist
    } else {
        // Find the existing playlist by name
        playlist = playlists.find(pl => pl.name.toLowerCase() === playlistName.toLowerCase());
        
        if (!playlist) {
            alert("Playlist not found!");
            return;
        }
    }
    
    // Add the song to the selected playlist
    if (!playlist.songs.includes(songId)) {
        playlist.songs.push(songId);
        alert("Song added to playlist successfully!");
    } else {
        alert("Song is already in the playlist!");
    }
}

// Function to create a new playlist
function newplaylist() {
    const newPlaylistNameInput = document.createElement("input");
    newPlaylistNameInput.setAttribute("type", "text");
    newPlaylistNameInput.setAttribute("placeholder", "Enter the name of the new playlist");

    const createButton = document.createElement("button");
    createButton.textContent = "Create Playlist";
    createButton.addEventListener("click", function() {
        const newPlaylistName = newPlaylistNameInput.value.trim();
        if (newPlaylistName !== "") {
            const newPlaylistId = playlists.length > 0 ? Math.max(...playlists.map(pl => pl.id)) + 1 : 1;
            const newPlaylist = { id: newPlaylistId, name: newPlaylistName, songs: [] };
            playlists.push(newPlaylist);
            renderPlaylists();
            newPlaylistNameInput.remove();
            createButton.remove();
        }
    });

    document.getElementById("playlist").appendChild(newPlaylistNameInput);
    document.getElementById("playlist").appendChild(createButton);
}

// Function to filter songs based on search query
function searchSongs() {
    const searchQuery = document.getElementById("search-input").value.trim().toLowerCase();
    const filteredSongs = songs.filter(song =>
        song.name.toLowerCase().includes(searchQuery) ||
        song.artist.toLowerCase().includes(searchQuery)
    );
    renderFilteredSongs(filteredSongs);
}

// Modify the rendering functions to include search results

function renderFilteredSongs(filteredSongs) {
    const allSongsContainer = document.getElementById("all-songs");
    allSongsContainer.innerHTML = `
        <label for="genre-filter">Filter by Genre:</label>
        <select id="genre-filter" onchange="filterByGenre()">
            <option value="all">All Genres</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Grunge">Grunge</option>
            <option value="Hip Hop">Hip Hop</option>
        </select>
    `; // Clear existing song list

    filteredSongs.forEach(song => {
        const songElement = document.createElement("div");
        songElement.innerHTML = `
            <p>${song.name} - ${song.artist}</p>
            <button onclick="playSong(${song.id})">Play</button>
            <button onclick="addToPlaylist(${song.id})">Add to Playlist</button>
        `;
        allSongsContainer.appendChild(songElement);
    });
}


// Initial rendering of all songs and playlists
renderAllSongs();
renderPlaylists();
