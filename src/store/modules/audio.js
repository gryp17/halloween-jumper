import AudioPlayer from '@/services/audio-player';

const actions = {
	/**
	 * Plays an audio track once
	 * @param {Object} context
	 * @param {Object} data
	 * @returns {Promise}
	 */
	playTrack(context, { track, volume }) {
		const soundEnabled = context.rootState.game.settings.sound;

		if (soundEnabled) {
			return AudioPlayer.throttledPlayTrack(track, volume);
		}
	},
	/**
	 * Plays the music tracks
	 * @param {Object} context
	 * @param {Float} volume
	 */
	playMusic(context, volume = 0.5) {
		const musicEnabled = context.rootState.game.settings.music;

		if (musicEnabled) {
			AudioPlayer.playMusic(volume);
		}
	},
	/**
	 * Stops the music track
	 * @param {Object} context
	 */
	stopMusic(context) {
		AudioPlayer.stopMusic();
	}
};

export default {
	namespaced: true,
	actions
};
