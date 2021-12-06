const routes = {
	menu: 'menu',
	game: 'game'
};

const getDefaultState = () => {
	return {
		route: 'menu'
	};
};

const state = getDefaultState();

const getters = {
	/**
	 * Indicates whether the main menu should be visible
	 * @param {Object} state
	 * @returns {Boolean}
	 */
	menuIsOpened(state) {
		return state.route === routes.menu;
	},
	/**
	 * Indicates whether the game should be visible
	 * @param {Object} state
	 * @returns {Boolean}
	 */
	gameIsOpened() {
		return state.route === routes.game;
	}
};

const mutations = {
	SET_ROUTE(state, route) {
		state.route = route;
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
	 * Changes the current route
	 * @param {Object} context
	 * @param {String} route
	 */
	setRoute(context, route) {
		context.commit('SET_ROUTE', route);
	},
	/**
	 * Opens the main menu
	 * @param {Object} context
	 */
	openMainMenu(context) {
		context.commit('SET_ROUTE', routes.menu);
	},
	/**
	 * Opens the game
	 * @param {Object} context
	 */
	openGame(context) {
		context.commit('SET_ROUTE', routes.game);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
