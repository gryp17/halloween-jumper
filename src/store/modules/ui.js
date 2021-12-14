import config from '@/game/config';

const getDefaultState = () => {
	return {
		animations: config.animations,
		mainMenuClass: ''
	};
};

const state = getDefaultState();

const getters = {
	showAnimation(state) {
		const animations = state.animations;

		const className = [
			animations.common,
			animations.show[0]
		].join(' ');

		return className;
	},
	hideAnimation(state) {
		const animations = state.animations;

		const className = [
			animations.common,
			animations.hide
		].join(' ');

		return className;
	},
	randomShowAnimation(state) {
		const animations = state.animations;

		const animation = _.sample(animations.show);
		const className = [
			animations.common,
			animation
		].join(' ');

		return className;
	}
};

const mutations = {
	RESET_STATE(state) {
		Object.assign(state, getDefaultState());
	},
	SET_MAIN_MENU_CLASS(state, animation) {
		state.mainMenuClass = animation;
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
	 * Shows the main menu using a random animation
	 * @param {Object} context
	 * @returns {Promise}
	 */
	showMainMenu(context) {
		return new Promise((resolve) => {
			context.commit('SET_MAIN_MENU_CLASS', context.getters.randomShowAnimation);
			setTimeout(resolve, config.animations.duration);
		});
	},
	/**
	 * Hides the main menu using an animation
	 * @param {Object} context
	 * @returns {Promise}
	 */
	hideMainMenu(context) {
		return new Promise((resolve) => {
			context.commit('SET_MAIN_MENU_CLASS', context.getters.hideAnimation);
			setTimeout(resolve, config.animations.duration);
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
