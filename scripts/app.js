const timerText = document.querySelector('.timer');
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const pause = document.querySelector('.pause');
const sessionsFinished = document.querySelector('p');
const rightBar = document.querySelector('.left').childNodes[1];
const leftBar = document.querySelector('.right').childNodes[1];

const focusTimer = 1500;
const pauseTimer = 300;
const longPauseTimer = 900;
let timer;
let sessionCount = 1;
let m;
let s;
let timeInterval;
let fillInterval;
let rightDeg = 0;
let leftDeg = 0;
let secondsTimer;
let suspend = false;
let started = false;
start.addEventListener('click', timerStart);
stop.addEventListener('click', stopAll);
pause.addEventListener('click', pauseTime);

function timerStart() {
    if(started === false) {
        suspend = false;
        started = true;
        sessionTime();
        barFill();
        timeCountdown();
    }
    else {
        suspend = false;
    }
}
function pauseTime() {

    if (suspend && started) {
        suspend = false;
    } else {
        suspend = true;
    }
    barFill();
    timeCountdown();
}

function stopAll() {
    timerText.textContent = `25:00`;
    timer = focusTimer;
    sessionCount = 1;
    rightDeg = 0;
    rightBar.style.transform = `rotate(${Math.round(rightDeg)}deg)`;
    leftDeg = 0;
    started = false;
    secondsTimer = timer;
    clearInterval(timeInterval);
    clearInterval(fillInterval);
}

function sessionTime() {

    if (sessionCount % 8 === 0) {

        timer = longPauseTimer;

    } else if (sessionCount % 2 !== 0) {

        timer = focusTimer;

    } else if (sessionCount % 2 === 0) {

        timer = pauseTimer;
    }
    m = timer / 60;
    s = timer - m * 60;
}
function timeCountdown() {
    if (!suspend) {
        timeInterval = setInterval(() => {

            if (s < 10) {
                s = `0${s}`;
            }

            if (m < 10) {
                timerText.textContent = `0${m}:${s}`;
            } else {
                timerText.textContent = `${m}:${s}`;
            }

            if (m == 0 && s == 0) {

                sessionCount++;
                clearInterval(timeInterval);
                timerStart();
                
            }

            if (s == 0) {
                s = 60;
                m--;
            }

            s--;

        }, 1000);
    } else {
        clearInterval(timeInterval);
    }
}
function barFill() {

    secondsTimer = timer;
    const onePercent = (1 / 100) * timer;

    if (!suspend) {

        fillInterval = setInterval(() => {

            if (secondsTimer % onePercent === 0 && secondsTimer !== timer) {

                if (Math.round(rightDeg) < 180) {

                    rightDeg += 3.6;

                    rightBar.style.transform = `rotate(${Math.round(rightDeg)}deg)`;

                } else if (Math.round(leftDeg) < 180) {

                    leftDeg += 3.6;

                    leftBar.style.transform = `rotate(${Math.round(leftDeg)}deg)`;

                }

                if (Math.round(leftDeg) >= 180) {
                    rightDeg = 0;
                    leftDeg = 0;

                    rightBar.style.transform = `rotate(${Math.round(rightDeg)}deg)`;

                    leftBar.style.transform = `rotate(${Math.round(leftDeg)}deg)`;

                    timerStart();

                }
            }
            secondsTimer--;
        }, 1000);
    } else {
        clearInterval(fillInterval);
    }
}
