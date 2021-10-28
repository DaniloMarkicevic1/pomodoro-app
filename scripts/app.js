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
    if (started === false) {
        suspend = false;
        started = true;
        stop.classList.remove('hide');
        pause.classList.remove('hide');
        start.classList.add('hide');
        sessionTime();
        barFill();
        timeCountdown();
    } else {
        suspend = false;
    }
}

function pauseTime() {
    if (suspend) {
        pause.textContent = `Pause`;
        suspend = false;
    } else {
        pause.textContent = `Continue`;
        suspend = true;
    }
}

function stopAll() {
    timerText.textContent = `25:00`;
    timer = focusTimer;
    sessionCount = 1;
    rightDeg = 0;
    leftDeg = 0;
    rightBar.style.transform = `rotate(${Math.round(rightDeg)}deg)`;
    leftBar.style.transform = `rotate(${Math.round(leftDeg)}deg)`;
    started = false;
    secondsTimer = timer;
    clearInterval(timeInterval);
    clearInterval(fillInterval);
    stop.classList.add('hide');
    pause.classList.add('hide');
    start.classList.remove('hide');
}

function sessionTime() {
    console.log(sessionCount);
    if (sessionCount % 8 === 0) {
        timer = longPauseTimer;
    } else if (sessionCount % 2 !== 0) {
        timer = focusTimer;
        sessionsFinished.textContent = `Sessions Finished: ${
            sessionCount / 2 - 0.5
        }`;
    } else if (sessionCount % 2 === 0) {
        timer = pauseTimer;
    }
    m = timer / 60;
    s = timer - m * 60;
}

function timeCountdown() {
    timeInterval = setInterval(() => {
        if (!suspend) {
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
                started = false;
                timerStart();
            }

            if (s == 0) {
                s = 60;
                m--;
            }

            s--;
        } else {
            return;
        }
    }, 1000);
}

function barFill() {
    secondsTimer = timer;
    const onePercent = (1 / 100) * timer;

    fillInterval = setInterval(() => {
        if (!suspend) {
            if (secondsTimer % onePercent === 0 && secondsTimer !== timer) {
                if (Math.round(rightDeg) < 180) {
                    rightDeg += 3.6;

                    rightBar.style.transform = `rotate(${Math.round(
                        rightDeg
                    )}deg)`;
                } else if (Math.round(leftDeg) < 180) {
                    leftDeg += 3.6;

                    leftBar.style.transform = `rotate(${Math.round(
                        leftDeg
                    )}deg)`;
                }

                if (Math.round(leftDeg) >= 180) {
                    rightDeg = 0;
                    leftDeg = 0;

                    rightBar.style.transform = `rotate(${Math.round(
                        rightDeg
                    )}deg)`;

                    leftBar.style.transform = `rotate(${Math.round(
                        leftDeg
                    )}deg)`;

                    clearInterval(fillInterval);
                    // timerStart();
                }
            }
            secondsTimer--;
        } else {
            return;
        }
    }, 1000);
}
