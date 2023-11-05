'use strict';

// Selecting elements

const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const imgDice = document.querySelector('.dice');
const current0 = document.querySelector('#current--0').textContent;
const current1 = document.querySelector('#current--1').textContent;

// Starting conditions
document.querySelector(`#score--0`).textContent = 0;
document.querySelector(`#score--1`).textContent = 0;
document.querySelector('.dice').classList.add('hidden');

let activePlayer = 0;
let currentScore = 0;

let totalScore0 = 0;
let totalScore1 = 0;
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
      activePlayer = activePlayer === 0 ? 1 : 0;
      const nodeSec = document.querySelectorAll(`.player`);
      for (let i = 0; i < nodeSec.length; i++) {
        nodeSec[i].classList.toggle('player--active');
      }
    }
  }
});

// Holding the score

btnHold.addEventListener('click', function () {
  if (playing) {
    // console.log(currentScore);

    // console.log(totalScore0, totalScore1);
    // console.log(currentScore);

    if (activePlayer === 0) {
      totalScore0 += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent =
        totalScore0;
    }

    if (activePlayer === 1) {
      totalScore1 += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent =
        totalScore1;
    }
    currentScore = 0;

    // If the held score is 100+
    if (activePlayer === 0 && totalScore0 >= 100) {
      document.querySelector('.player--0').classList.add('player--winner');

      playing = false;
    }

    if (activePlayer === 1 && totalScore1 >= 100) {
      document.querySelector('.player--1').classList.add('player--winner');

      playing = false;
    }

    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    const nodeSec = document.querySelectorAll(`.player`);
    for (let i = 0; i < nodeSec.length; i++) {
      nodeSec[i].classList.toggle('player--active');
    }
  }
});

// When user clicks new game - restoring the starting conditions
btnNewGame.addEventListener('click', function () {
  let activePlayer = 0;
  let currentScore = 0;
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  document.querySelector('.dice').classList.add('hidden');
  totalScore0 = 0;
  totalScore1 = 0;

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');

  // taking back the player active class to player 0
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
});
