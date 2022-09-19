// VARIABLES

const artistInput = document.querySelector(".artist-input");
const songInput = document.querySelector(".song-input");
const btn = document.querySelector(".find-btn");
const songDesc = document.querySelector(".song-description");
const lyricField = document.querySelector(".lyric-text");
const errorBox = document.querySelector(".error-box");
const errorMessage = document.querySelector(".error-message");

// FUNCTIONS

const formatLyrics = (lyrics) => {
  return lyrics.split("\n").join("<br/>");
};

const formatName = (name) => {
  return name[0].toUpperCase() + name.slice(1);
};

const showErrorMessage = (message) => {
  errorMessage.textContent = message;
  errorBox.style.display = "block";
  setTimeout(() => {
    errorMessage.textContent = "";
    errorBox.style.display = "none";
  }, 2500);
};

const getLyrics = async () => {
  const artistValue = artistInput.value;
  const songValue = songInput.value;

  if (artistValue.trim() === "" || songValue.trim() === "") {
    showErrorMessage("Please fill all fields!");
    return;
  } else {
    errorBox.style.display = "none";
    fetch(`https://api.lyrics.ovh/v1/${artistValue}/${songValue}`)
      .then((res) => res.json())
      .then((lyricData) => {
        const artistName = formatName(artistValue);
        const songName = formatName(songValue);
        const formattedLyrics = formatLyrics(lyricData.lyrics);
        songDesc.textContent = `${artistName} - ${songName}`;
        lyricField.innerHTML = formattedLyrics;
        artistInput.value = "";
        songInput.value = "";
        if (lyricData && lyricData.lyrics === "") {
          showErrorMessage("API Error, try again!");
        }
      });
  }
};

// EVENT LISTENER

btn.addEventListener("click", getLyrics);
