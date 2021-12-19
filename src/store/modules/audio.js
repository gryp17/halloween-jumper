import AudioPlayer from '@/services/audio-player';

const getDefaultState = () => {
	return {
		musicIsPlaying: false
	};
};

const state = getDefaultState();

const mutations = {
	RESET_STATE(state) {
		Object.assign(state, getDefaultState());
	},
	SET_MUSIC_IS_PLAYING(state, musicIsPlaying) {
		state.musicIsPlaying = musicIsPlaying;
	}
};

const actions = {
	/**
	 * Plays an audio track once
	 * @param {Object} context
	 * @param {Object} data
	 * @returns {Promise}
	 */
	playTrack(context, { track, volume }) {
		const soundIsEnabled = context.rootState.settings.sound;
		const soundVolume = context.rootState.settings.soundVolume;

		//multiply the custom volume parameter (if it's set) with the settings volume to calculate the correct volume
		//that way each track can have a different volume, but the global volume will still affect it
		const finalVolume = volume ? soundVolume * volume : soundVolume;

		if (soundIsEnabled) {
			return AudioPlayer.throttledPlayTrack(track, finalVolume);
		}
	},
	/**
	 * Plays the music tracks
	 * @param {Object} context
	 * @param {Float} volume
	 */
	playMusic(context) {
		const musicIsEnabled = context.rootState.settings.music;
		const musicVolume = context.rootState.settings.musicVolume;
		const musicIsPlaying = context.state.musicIsPlaying;

		if (musicIsEnabled && !musicIsPlaying) {
			AudioPlayer.playMusic(musicVolume);
			context.commit('SET_MUSIC_IS_PLAYING', true);
		}
	},
	/**
	 * Stops the music track
	 * @param {Object} context
	 */
	stopMusic(context) {
		AudioPlayer.stopMusic();
		context.commit('SET_MUSIC_IS_PLAYING', false);
	},
	/**
	 * Changes the music player volume
	 * @param {Object} context
	 * @param {Float} volume
	 */
	changeMusicVolume(context, volume) {
		AudioPlayer.changeMusicVolume(volume);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
