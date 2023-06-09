const soundsCollection = new Map();
const timer = new Timer();

const phrases = ['Это не у нас...', 'Погода хорошая - сходите, погуляйте.', 'Если что, вызывайте полицию.', 'Ой, а я не слышу...'];

let timeoutIndex;
let playingSound;
let soundsSetNames = [];
let soundsSet = [];

document.querySelector('#phrase_of_the_day').textContent = phrases[getRandomInt(0, phrases.length - 1)];

document.querySelector('#start_btn').addEventListener('click', e => {
	soundsSetNames = [];

	const soundsNamesElem = document.querySelector('#sounds_combination').querySelectorAll('input');

	soundsNamesElem.forEach(elem => {
		if (elem.checked) {
			soundsSetNames.push(elem.value);
		}
	});

	let timeForStart = document.querySelector('#start_time').value;
	let timeInterval = document.querySelector('#time_interval').value;

	if (timeForStart && !timer.isOn) {
		document.querySelector('#start_time').value = '';
		timer.setTimer(timeForStart, timeInterval);
		return;
	}

	if (!timeForStart && timeInterval && !timer.isOn) {
		timer.setTimer(null, timeInterval);
	}

	if (soundsSetNames.length) {
		document.querySelector('#sounds_combination').classList.remove('fieldset-err');
		document.querySelector('#sounds_combination_err').classList.remove('active');

		prepareSounds();
		playRundomSound();
	} else {
		document.querySelector('#sounds_combination').classList.add('fieldset-err');
		document.querySelector('#sounds_combination_err').classList.add('active');
		return;
	}
});

document.querySelector('#stop_btn').addEventListener('click', e => {
	document.querySelector('#start_btn').removeAttribute('disabled');
	soundsCollection.get(playingSound).pause();
	clearInterval(timeoutIndex);
	timer.stop();
	timer.startTimerIndex = null;
	timer.endTimerIndex = null;
	timer.isOn = false;
	document.querySelector('#timer').style.visibility = 'hidden';
	document.querySelector('#info_start').innerHTML = '';
	document.querySelector('#info_end').innerHTML = '';
});

function prepareSounds() {
	soundsSet = [];
	soundsSetNames.forEach(name => {
		soundsSet = [...soundsSet, ...eval(name)];

		eval(name).forEach(sound => {
			const audioElem = new Audio(`./assets/sounds/${sound.name}.${sound.extension}`);
			audioElem.setAttribute('controls', true);

			audioElem.addEventListener('ended', () => {
				prepareNextTrack();
			});

			soundsCollection.set(sound.name, audioElem);
		});
	});
}

function playRundomSound() {
	if (!eval(soundsSet).length) {
		alert('Нет звуков!');
		return;
	}

	document.querySelector('#start_btn').setAttribute('disabled', true);

	const number = getRandomInt(0, eval(soundsSet).length - 1);
	const playerElem = document.querySelector('#player');
	const audioElem = playerElem.querySelector('audio');

	if (audioElem) {
		playerElem.removeChild(audioElem);
	}

	playingSound = eval(soundsSet)[number].name;
	playerElem.appendChild(soundsCollection.get(playingSound));
	soundsCollection.get(playingSound).play();
}

function prepareNextTrack() {
	const min = +document.querySelector('#min_int').value;
	const max = +document.querySelector('#max_int').value;
	const waitingTime = getRandomInt(min, max);
	const timeElem = document.querySelector('#time');

	timer.elem = timeElem;
	timer.time = waitingTime;
	timer.start();

	timeoutIndex = setTimeout(() => playRundomSound(), waitingTime * 1000);
}

function getRandomInt(min = 0, max = 1) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
