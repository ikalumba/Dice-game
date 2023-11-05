'use strict';

// Player names

// let name0 = prompt('Player 1, enter yor name', 'Player 1');
// let name1 = prompt('Player 2, enter your name', 'Player 2');

// const player0NameEl = document.querySelector('#name--0');
// const player1NameEl = document.querySelector('#name--1');

// player0NameEl.textContent = name0 !== '' ? name0 : 'Player 1';
// player1NameEl.textContent = name1 !== '' ? name1 : 'Player 2';

// Selecting elements
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const imgDice = document.querySelector('.dice');
const current0 = document.querySelector('#current--0').textContent;
const current1 = document.querySelector('#current--1').textContent;
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scorePlayer0El = document.querySelector('#score--0');
const scorePlayer1El = document.querySelector('#score--1');

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  const nodeSec = document.querySelectorAll(`.player`);
  for (let i = 0; i < nodeSec.length; i++) {
    nodeSec[i].classList.toggle('player--active');
  }
};
// Starting conditions
scorePlayer0El.textContent = 0;
scorePlayer1El.textContent = 0;
imgDice.classList.add('hidden');

let activePlayer = 0;
let currentScore = 0;

let totalScores = [0, 0];

let playing = true;

// Rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // getting the rolled number
    const rolled = Math.trunc(Math.random() * 6 + 1);
    console.log(rolled);
    // Displaying image
    imgDice.src = `dice-${rolled}.png`;
    imgDice.classList.remove('hidden');

    if (rolled !== 1) {
      currentScore += rolled;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
    // If the rolled number is 1
    if (rolled === 1) {
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      switchPlayer();
    }
  }
});

// Holding the score

btnHold.addEventListener('click', function () {
  if (playing) {
    totalScores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // If the held score is 100+
    if (totalScores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      playing = false;
    }
    currentScore = 0;

    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    switchPlayer();
  }
});

// When user clicks new game - restoring the starting conditions
btnNewGame.addEventListener('click', function () {
  let activePlayer = 0;
  let currentScore = 0;
  scorePlayer0El.textContent = 0;
  scorePlayer1El.textContent = 0;
  imgDice.classList.add('hidden');
  totalScores = [0, 0];
  playing = true;

  player0El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');

  // taking back the player active class to player 0
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
});
