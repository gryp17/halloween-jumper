import Vue from 'vue';
import Game from '@/game/jumper/entry-points/game';

const getDefaultState = () => {
	return {
		images: {},
		settings: {} //controls, audio settings etc.
	};
};

const state = getDefaultState();

const getters = {

};

const mutations = {
	SET_IMAGES(state, images) {
		Vue.set(state, 'images', images);
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
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
