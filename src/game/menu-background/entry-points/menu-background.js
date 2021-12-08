import GameClient from '../../common/game-client';
// import Background from '../game-entities/background';
import Background from '@/game/jumper/game-entities/background';

/**
 * MenuBackground class
 */
export default class MenuBackground extends GameClient {
	/**
	 * Creates a new MenuBackground instance
	 * @param {Object} canvasIds
	 * @param {String} canvasWrapper
	 * @param {Object} images
	 * @param {Object} config
	 */
	constructor(canvasIds, canvasWrapper, images, config) {
		super(canvasIds, canvasWrapper, images, config, {}, {}, { playMusic: () => {}, playTrack: () => {} });

		this.background;
	}

	/**
	 * Returns the current inputs state
	 * @returns {Object}
	 */
	getInputs() {
		return {};
	}

	/**
	 * Initializes the game entities and starts the game
	 */
	start() {
		//game objects
		this.background = new Background(
			this,
			this.config.background.speed,
			this.config.background.selectedBackground
		);

		super.start();
	}

	/**
	 * Moves the game entities every tick
	 */
	moveEntities() {
		this.background.move();
	}

	/**
	 * Draws the game entities every tick
	 */
	drawEntities() {
		this.background.draw();
	}
}
