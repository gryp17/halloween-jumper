import Vue from 'vue';
import Game from '@/game/jumper/entry-points/game';

const getDefaultState = () => {
	return {
		images: {},
		settings: {}, //controls, audio settings etc.
		backgroundPosition: 0,
		backgroundImage: null
	};
};

const state = getDefaultState();

const getters = {

};

const mutations = {
	SET_IMAGES(state, images) {
		Vue.set(state, 'images', images);
	},
	SET_BACKGROUND_POSITION(state, position) {
		state.backgroundPosition = position;
	},
	SET_BACKGROUND_IMAGE(state, image) {
		state.backgroundImage = image;
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
	 * Sets the background horizontal position and background image
	 * @param {Object} context
	 * @param {Object} state
	 */
	setBackgroundState(context, { x, selectedBackground }) {
		if (x) {
			context.commit('SET_BACKGROUND_POSITION', x);
		}

		if (selectedBackground) {
			context.commit('SET_BACKGROUND_IMAGE', selectedBackground);
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
