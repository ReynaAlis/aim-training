const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const color = ['#78DBE2', '#32CD32', '#721422', '#2271B3', '#CEFF1D', '#926EAE', '#87CEFA', '#FF7F49'];
let score = 0;
let time = 0;
let interval; 

const clickSound = new Audio('sound/button-click.wav');

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
        clickSound.play();
    }
});

function startGame() {
    score = 0;
    timeEl.parentNode.classList.remove('hide');
    setTime(time);
    interval = setInterval(decreaseTime, 1000);
    createRandomCircle();
}

function decreaseTime() {
    if (time === 0) {
        clearInterval(interval);
        finishGame();
    } else {
        time--;
        setTime(time < 10 ? `0${time}` : time);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');

    board.innerHTML = `
        <div class="result-container">
            <h1>Score: <span class="primary">${score}</span></h1>
            <button id="restart" class="restart-btn">Play Again</button>
        </div>
    `;

    const restartBtn = document.querySelector('#restart');
    restartBtn.addEventListener('click', () => {
        location.reload();
    });
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.background = getRandomColor();
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return color[Math.floor(Math.random() * color.length)];
}



