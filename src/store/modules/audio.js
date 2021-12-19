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

		if (soundIsEnabled) {
			return AudioPlayer.throttledPlayTrack(track, volume);
		}
	},
	/**
	 * Plays the music tracks
	 * @param {Object} context
	 * @param {Float} volume
	 */
	playMusic(context, volume = 0.2) {
		const musicIsEnabled = context.rootState.settings.music;
		const musicIsPlaying = context.state.musicIsPlaying;

		if (musicIsEnabled && !musicIsPlaying) {
			AudioPlayer.playMusic(volume);
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
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
