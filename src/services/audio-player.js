import { Howl } from 'howler';

import tocata from '@/assets/audio/tocata.mp3';
import ghost from '@/assets/audio/ghost.mp3';
import jump from '@/assets/audio/jump.mp3';
import flip from '@/assets/audio/flip.mp3';
import dead from '@/assets/audio/dead.mp3';
import gameOver from '@/assets/audio/game-over.mp3';

import mop from '@/assets/audio/music/mop.mp3';
import hysteria from '@/assets/audio/music/hysteria.mp3';
import bliss from '@/assets/audio/music/bliss.mp3';
import time from '@/assets/audio/music/time.mp3';
import uprising from '@/assets/audio/music/uprising.mp3';
import contagion from '@/assets/audio/music/contagion.mp3';
import paranoid from '@/assets/audio/music/paranoid.mp3';

//sound effects
const tracks = {
	tocata,
	ghost,
	jump,
	flip,
	dead,
	gameOver
};

//background music tracks
const musicTracks = {
	mop,
	hysteria,
	bliss,
	time,
	uprising,
	contagion,
	paranoid
};

const howlerTracks = {};

//preload the tracks so they can be used in howler
Object.keys(tracks).forEach((key) => {
	const track = tracks[key];
	howlerTracks[key] = new Howl({
		src: [track],
		autoplay: false
	});
});

const player = new Audio();

/**
 * Plays an audio track once
 * @param {String} track
 * @param {Float} volume
 * @returns {Promise}
 */
function playTrack(track, volume = 1) {
	if (howlerTracks[track]) {
		return new Promise((resolve) => {
			const sound = howlerTracks[track];

			sound.on('end', () => {
				resolve();
			});

			sound.volume(volume);
			sound.play();
		});
	}
}

/**
 * Throttled version of the playTrack method that can only be called once every 100 miliseconds
 */
const throttledPlayTrack = _.throttle(playTrack, 100);

/**
 * Plays all the music tracks shuffled and repeating
 * @param {Float} volume
 */
function playMusic(volume = 1) {
	const audioTracks = _.shuffle(Object.values(musicTracks));
	let currentTrack = 0;

	player.src = audioTracks[currentTrack];
	player.volume = volume;
	const promise = player.play();

	//catch autoplay exceptions
	if (promise !== null) {
		promise.catch(() => {});
	}

	//once the current track is over start playin the next track
	player.onended = () => {
		currentTrack++;

		//repeat the playlist from the beginning
		if (currentTrack > audioTracks.length - 1) {
			currentTrack = 0;
		}

		player.src = audioTracks[currentTrack];
		player.play();
	};
}

/**
 * Stops playing the music tracks
 */
function stopMusic() {
	player.pause();
	player.currentTime = 0;
}

/**
 * Changes the music player volume
 * @param {Float} volume
 */
function changeMusicVolume(volume) {
	player.volume = volume;
}

export default {
	playTrack,
	throttledPlayTrack,
	playMusic,
	stopMusic,
	changeMusicVolume
};
