import config from '@/game/config';

const getDefaultState = () => {
	return {
		animations: config.animations,
		mainMenuAnimationClass: '',
		gameOverAnimationClass: '',
		gameOver: false
	};
};

const state = getDefaultState();

const getters = {
	/**
	 * Returns the default show animation class
	 * @param {Object} state
	 * @returns {String}
	 */
	showAnimation(state) {
		const animations = state.animations;

		const className = [
			animations.common,
			animations.show[0]
		].join(' ');

		return className;
	},
	/**
	 * Returns the default hide animation class
	 * @param {Object} state
	 * @returns {String}
	 */
	hideAnimation(state) {
		const animations = state.animations;

		const className = [
			animations.common,
			animations.hide
		].join(' ');

		return className;
	},
	/**
	 * Returns a random show animation class
	 * @param {Object} state
	 * @returns {String}
	 */
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
	SET_MAIN_MENU_ANIMATION_CLASS(state, animation) {
		state.mainMenuAnimationClass = animation;
	},
	SET_GAME_OVER_ANIMATION_CLASS(state, animation) {
		state.gameOverAnimationClass = animation;
	},
	SET_GAME_OVER(state, gameOver) {
		state.gameOver = gameOver;
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
			context.commit('SET_MAIN_MENU_ANIMATION_CLASS', context.getters.randomShowAnimation);
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
			context.commit('SET_MAIN_MENU_ANIMATION_CLASS', context.getters.hideAnimation);
			setTimeout(resolve, config.animations.duration);
		});
	},
	/**
	 * Shows the game over panel using an animation
	 * @param {Object} context
	 * @returns {Promise}
	 */
	showGameOver(context) {
		context.commit('SET_GAME_OVER', true);

		return new Promise((resolve) => {
			context.commit('SET_GAME_OVER_ANIMATION_CLASS', context.getters.showAnimation);
			setTimeout(resolve, config.animations.duration);
		});
	},
	/**
	 * Hides the game over panel using an animation
	 * @param {Object} context
	 * @returns {Promise}
	 */
	hideGameOver(context) {
		return new Promise((resolve) => {
			context.commit('SET_GAME_OVER_ANIMATION_CLASS', context.getters.hideAnimation);
			setTimeout(() => {
				context.commit('SET_GAME_OVER', false);
				resolve();
			}, config.animations.duration);
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
