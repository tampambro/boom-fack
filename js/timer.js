class Timer {
	time;
	timerIndex;
	elem;

	start() {
		this.timerIndex = setInterval(() => {
			if (this.time === 0) {
				clearInterval(this.timerIndex);
				return;
			}
			this.elem.closest('#timer').style.visibility = 'visible';
			this.time = this.time - 1;
			this.elem.textContent = this.time;
		}, 1000);
	}

	stop() {
		clearInterval(this.timerIndex);
	}

	setTimer(time, timeInterval) {
		console.log(time);
		time = this.timeFormat(time);
		let waitTime;
		let present = new Date();
		let hours = present.getHours();
		let minutes = present.getMinutes();
		let seconds = present.getSeconds();

		if (time[0] > hours || time[1] > minutes) {
			waitTime = ((((time[0] - hours) * 60) * 60) * 1000) + (((time[1] - minutes) * 60) * 1000) - (seconds * 1000);
		} else {
			////////<-------
			((((24 - hours) + time[0]) * 60) * 60) + (time[1] * 60) * 1000
		}

		console.log(waitTime);
		document.querySelector('#info_start').textContent = `Работа начнётся в ${time[0]}:${time[1]}. `;
		setTimeout(() => {
			document.querySelector('#start_btn').click();
		}, waitTime);
	}

	timeFormat(time) {
		time = time.split(':');
		return [+time[0], +time[1]];
	}
}
