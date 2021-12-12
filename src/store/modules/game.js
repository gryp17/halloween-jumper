import Vue from 'vue';
import Storage from '@/services/storage';
import Game from '@/game/jumper/entry-points/game';
import config from '@/game/config';

const getDefaultState = () => {
	return {
		images: {},
		settings: {
			controls: {},
			sound: true,
			music: true
		},
		selectedBackground: null,
		backgroundPosition: 0,
		selectedDummy: 'green',
		selectedDifficulty: 'medium'
	};
};

const state = getDefaultState();

const getters = {

};

const mutations = {
	RESET_STATE(state) {
		Object.assign(state, getDefaultState());
	},
	SET_IMAGES(state, images) {
		Vue.set(state, 'images', images);
	},
	SET_BACKGROUND_POSITION(state, position) {
		state.backgroundPosition = position;
	},
	SET_SELECTED_BACKGROUND(state, background) {
		state.selectedBackground = background;
	},
	SET_SELECTED_DUMMY(state, dummy) {
		state.selectedDummy = dummy;
	},
	SET_SELECTED_DIFFICULTY(state, difficulty) {
		state.selectedDifficulty = difficulty;
	},
	SET_SETTINGS(state, settings) {
		Vue.set(state, 'settings', settings);
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
	 * Preloads all the game images
	 * @param {Object} context
	 * @returns {Promise}
	 */
	preloadGameImages(context) {
		return new Promise((resolve) => {
			Game.preloadGameImages((images) => {
				context.commit('SET_IMAGES', images);
				resolve(images);
			});
		});
	},
	/**
	 * Sets the selected background
	 * @param {Object} context
	 * @param {String} background
	 */
	setSelectedBackground(context, background) {
		context.commit('SET_SELECTED_BACKGROUND', background);
	},
	/**
	 * Sets the background horizontal (x) position so it can be reused when starting/restarting the game
	 * @param {Object} context
	 * @param {Number} position
	 */
	setBackgroundPosition(context, position) {
		context.commit('SET_BACKGROUND_POSITION', position);
	},
	/**
	 * Sets the selected dummy skin
	 * @param {Object} context
	 * @param {String} dummy
	 */
	setSelectedDummy(context, dummy) {
		context.commit('SET_SELECTED_DUMMY', dummy);
	},
	/**
	 * Sets the selected difficulty
	 * @param {Object} context
	 * @param {String} difficulty
	 */
	setSelectedDifficulty(context, difficulty) {
		context.commit('SET_SELECTED_DIFFICULTY', difficulty);
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
			const defaultState = getDefaultState();

			settings = {
				...defaultState.settings,
				controls: config.defaultControls
			};
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
		context.commit('SET_SETTINGS', settings);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
