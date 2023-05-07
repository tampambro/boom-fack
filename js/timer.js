class Timer {
	time;
	elem;
	isOn = false;
	timerIndex;
	startTimerIndex;
	endTimerIndex;

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
		this.isOn = true;
		let waitTime;
		let present = new Date();
		let hours = present.getHours();
		let minutes = present.getMinutes();
		let seconds = present.getSeconds();

		if (time) {
			time = this.timeFormat(time);
		}

		if (this.startTimerIndex) {
			clearInterval(this.startTimerIndex);
		}

		if (this.endTimerIndex) {
			clearInterval(endTimerIndex);
		}

		if (time) {
			if (time[0] > hours || time[1] > minutes) {
				waitTime = ((((time[0] - hours) * 60) * 60) * 1000) + (((time[1] - minutes) * 60) * 1000) - (seconds * 1000);
			} else {
				waitTime = ((((((24 - hours) + time[0]) * 60) * 60) * 1000) + (time[1] * 60) * 1000) - (seconds * 1000);
			}

			document.querySelector('#info_start').innerHTML = `Работа начнётся в <strong>${time[0] < 10 ? '0' + time[0] : time[0]}:${time[1] < 10 ? '0' + time[1] : time[1]}</strong>.`;
			this.startTimerIndex = setTimeout(() => {
				document.querySelector('#start_btn').click();
			}, waitTime);
		}

		if (timeInterval) {
			document.querySelector('#info_end').innerHTML = `Отработка будет длиться <strong>${timeInterval} (мин.)</strong>.`;
			waitTime = waitTime ?? 0;
			waitTime += (timeInterval * 60) * 1000;

			this.endTimerIndex = setTimeout(() => {
				document.querySelector('#stop_btn').click();
			}, waitTime);
		}
	}

	timeFormat(time) {
		time = time.split(':');
		return [+time[0], +time[1]];
	}
}
