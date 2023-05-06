class Timer {
  time;
  timerIndex;
  elem;

  start() {
    this.timerIndex = setInterval(() => {
      if (this.time === 0) {
        clearInterval(this.timerIndex);
        return
      }
      this.elem.closest('#timer').style.visibility = 'visible';
      this.time = this.time - 1;
      this.elem.textContent = this.time;
    }, 1000);
  }

  stop() {
    clearInterval(this.timerIndex);
  }
}
