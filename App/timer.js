let timerId;
//game timer


export function startTimer(gameseconds, timerEl) {
  let minutes = Math.floor(gameseconds / 60);
  let seconds = gameseconds % 60;
  timerId = setInterval(() => {
    gameseconds--;
    minutes = Math.floor(gameseconds / 60);
    seconds = gameseconds % 60;
    if (gameseconds <= 0) {
      clearInterval(timerId)
      document.getElementById('cardfield').innerHTML = ''
      document.getElementById('cardfield').appendChild(startbutton);
      minutes = Math.floor(gameseconds / 60);
      seconds = gameseconds % 60;
    };
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerEl.innerHTML = `${minutes}:${seconds}`;
  }, 1000);

};
export function stopTimer() {
  clearInterval(timerId)

};
