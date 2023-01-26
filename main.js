import {allFiveLetterWords} from './dictionary.js'
const tileArea = document.getElementById('play-area')
const WORD_LENGTH = 5;
let targetWord = allFiveLetterWords[Math.floor(Math.random() * allFiveLetterWords.length - 1)]
console.log(targetWord, typeof targetWord)



function initializeGame() {
   document.addEventListener('click', handleClick)
   document.addEventListener('keydown', handleKeyPress)
   console.log(allFiveLetterWords)

}

function pauseInteraction() {
   document.removeEventListener('click', handleClick);
   document.removeEventListener('keydown', handleKeyPress)
}

function handleClick(e) {
   const t = e.target
   if (t.matches("[data-key]")) {
      pressKey(t.dataset.key);
      return;
   }

   if (t.matches("[data-enter]")) {
      submitGuess();
      return;
   }

    if (t.matches("[data-delete]")) {
      deleteKey(t.dataset.key);
      return;
   }
}

function handleKeyPress(e) {
   if (e.key.match(/^[a-z]$/)) {
      pressKey(e.key);
      return;
   }

   if (e.key === "Enter") {
      submitGuess();
      return;
   }

   if (e.key === "Backspace" || e.key === "Delete") {
      deleteKey(e.key);
      return;
   }
}

function pressKey(key) {
   const activeTiles = getActiveTiles();
   if (activeTiles.length === WORD_LENGTH) return;

   const nextTile = tileArea.querySelector(":not([data-letter])")
   nextTile.dataset.letter = key
   nextTile.textContent = key;
   nextTile.dataset.state = "active"
}

function deleteKey() {
   const activeTiles = [...getActiveTiles()];
   const lastTile = activeTiles[activeTiles.length - 1]
   // Nothing to delete
   if (lastTile == null) return;


   lastTile.textContent = ""
   delete lastTile.dataset.letter
   delete lastTile.dataset.state
}

function getActiveTiles() {
   return document.querySelectorAll('[data-state="active"]');
}

function submitGuess() {
   const tiles = getActiveTiles();
   // reduce better here
   const guess = [...tiles].map((tile) => tile.dataset.letter).join('');

   if (guess.length !== WORD_LENGTH) {
      // shakeLetters(tiles);
      showShortAlert();
      deactivateTiles(tiles)
      return;
   }
   if (!allFiveLetterWords.includes(guess)) {
      rejectWord();
      deactivateTiles(tiles)
      return;
   }
   
   if (guess === targetWord) {
      assessGuess(tiles, guess);
      showWinScreen();
   }
   if (guess !== targetWord) {
      assessGuess(tiles, guess);
   }
}

function deactivateTiles(tiles) {
   tiles.forEach((tile) => {
      tile.textContent = ""
      delete tile.dataset.letter
      delete tile.dataset.state
   })
}

function showShortAlert() {
   alert("NOT ENOUGH LETTERS")
}
function rejectWord() {
   alert("NOT A WORD")
}

function shakeLetters(tiles) {
   tiles.forEach((tile) => tile.classList.add('shake'))
}

function assessGuess(tiles, guess) {
   for (let i = 0; i < guess.length; i++) {
      if (guess[i] === targetWord[i]) tiles[i].dataset.state = "correct"
      else if (guess[i] !== targetWord[i] && targetWord.includes(guess[i])) tiles[i].dataset.state = "wrong-pos"
      else tiles[i].dataset.state = "wrong"
   }
}
function showWinScreen() {
   alert("YOU WIN!")
}





initializeGame();

