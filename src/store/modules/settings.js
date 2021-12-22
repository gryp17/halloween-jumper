import Storage from '@/services/storage';
import config from '@/game/config';

const getDefaultState = () => {
	return {
		controls: config.defaultControls,
		sound: config.defaultAudioSettings.sound.enabled,
		music: config.defaultAudioSettings.music.enabled,
		soundVolume: config.defaultAudioSettings.sound.volume, //1
		musicVolume: config.defaultAudioSettings.music.volume //0.4
	};
};

const state = getDefaultState();

const getters = {

};

const mutations = {
	RESET_STATE(state) {
		Object.assign(state, getDefaultState());
	},
	SET_CONTROLS(state, controls) {
		state.controls = controls;
	},
	SET_SOUND(state, sound) {
		state.sound = sound;
	},
	SET_MUSIC(state, music) {
		state.music = music;
	},
	SET_SOUND_VOLUME(state, volume) {
		state.soundVolume = volume;
	},
	SET_MUSIC_VOLUME(state, volume) {
		state.musicVolume = volume;
	}
};

const actions = {
	/**
	 * Resets the module state
	 * @param {Object} context
	 */
	resetState(context) {
		context.commit('RESET_STATE');
	},
	/**
	 * Fetches the settings
	 * @param {Object} context
	 * @returns {Object}
	 */
	getSettings(context) {
		let settings = Storage.getSettings();

		//if no settings are present in the storage use the default settings
		if (!settings) {
			settings = getDefaultState();
		}

		context.dispatch('setSettings', settings);

		return settings;
	},
	/**
	 * Sets the settings in the local storage and the vuex store
	 * @param {Object} context
	 * @param {Object} settings
	 */
	setSettings(context, settings) {
		Storage.setSettings(settings);
		context.commit('SET_CONTROLS', settings.controls);
		context.commit('SET_SOUND', settings.sound);
		context.commit('SET_MUSIC', settings.music);
		context.commit('SET_SOUND_VOLUME', settings.soundVolume);
		context.commit('SET_MUSIC_VOLUME', settings.musicVolume);
	},
	/**
	 * Updates the settings object with the provided values
	 * @param {Object} context
	 * @param {Object} newSettings
	 */
	updateSettings(context, newSettings) {
		//merge the current values with the new settings values
		const currentSettings = {
			...context.state
		};

		const settings = {
			...currentSettings,
			...newSettings
		};

		context.dispatch('setSettings', settings);

		const musicIsEnabled = settings.music;
		const musicIsPlaying = context.rootState.audio.musicIsPlaying;
		const musicVolumeChanged = newSettings.musicVolume && (newSettings.musicVolume !== currentSettings.musicVolume);

		//change the music volume if it's already playing
		if (musicIsEnabled && musicIsPlaying && musicVolumeChanged) {
			context.dispatch('audio/changeMusicVolume', newSettings.musicVolume, { root: true });
		}

		//start/stop the music when the music flag changes
		if (musicIsEnabled && !musicIsPlaying) {
			context.dispatch('audio/playMusic', null, { root: true });
		} else if (!musicIsEnabled && musicIsPlaying) {
			context.dispatch('audio/stopMusic', null, { root: true });
		}
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
