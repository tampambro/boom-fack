const soundsCollection = new Map();
const timer = new Timer();

let timeoutIndex;
let playingSound;
let soundsSetName;

document.querySelector('#start_btn').addEventListener('click', e => {
	soundsSetName = document.querySelector('#sounds_set_name').value;

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

	prepareSounds();
	playRundomSound();
});

document.querySelector('#stop_btn').addEventListener('click', e => {
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
  eval(soundsSetName).forEach(sound => {
		const audioElem = new Audio(`./assets/sounds/${sound.name}.${sound.extension}`);
		audioElem.setAttribute('controls', true);

    audioElem.addEventListener('ended', () => {
      prepareNextTrack();
    });

    soundsCollection.set(sound.name, audioElem);
  });
}

function playRundomSound() {
  if (!eval(soundsSetName).length) {
    alert('Нет звуков!');
    return;
  }

	const number = getRandomInt(0, eval(soundsSetName).length - 1);
	const playerElem = document.querySelector('#player');
	const audioElem = playerElem.querySelector('audio');

	if (audioElem) {
		playerElem.removeChild(audioElem);
	}

	playingSound = eval(soundsSetName)[number].name;
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
