'use strict';

// Store DOM element reference in variable
const player0El = document.querySelector('.player--0'),
  player1El = document.querySelector('.player--1'),
  score0El = document.getElementById('score--0'),
  score1El = document.getElementById('score--1'),
  currentScore0El = document.getElementById('current--0'),
  currentScore1El = document.getElementById('current--1'),
  diceEl = document.querySelector('.dice'),
  btnNewEl = document.querySelector('.btn--new'),
  btnRollEl = document.querySelector('.btn--roll'),
  btnHoldEl = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Initialise/ start new game
function init() {
  // Starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add('hidden');

  // Reset players' background
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
init();

//switch to next player
const switchPlayer = function () {
  // debugger;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Event Handlers
// Rolling dice functionality
btnRollEl.addEventListener('click', () => {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    currentScore += dice;

    // debugger;
    if (scores[activePlayer] + currentScore >= 100 && dice !== 1) {
      // Finish the game
      playing = false;
      // Update the player's score
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer] + currentScore;
      document.getElementById(`current--${activePlayer}`).textContent = dice;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else if (dice !== 1) {
      // 3. Check for rolled 1: if true,
      // Add dice value to current score
      // debugger;
      // currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});
// Button hold event functionality
btnHoldEl.addEventListener('click', () => {
  if (playing) {
    // 1. Add current score to active player's socre
    // debugger;
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check score is >=100
    if (scores[activePlayer] < 100) {
      switchPlayer();
    }
  }
});
// New game
btnNewEl.addEventListener('click', init);
