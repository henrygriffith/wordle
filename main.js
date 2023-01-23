// current tile is the active tile. Upon typing a valid key, change innerHTML.
const tileArea = document.getElementById('play-area')
const WORD_LENGTH = 5;
const targetWord = "CLIMB"

function initializeGame() {
   document.addEventListener('click', handleClick)
   document.addEventListener('keydown', handleKeyPress)
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
   const tiles = document.querySelectorAll('[data-state="active"]');
   return tiles
}

function submitGuess() {

}



initializeGame();

