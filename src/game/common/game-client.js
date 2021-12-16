import _ from 'lodash';
import Utils from './utils';
import Context from './context';
import ImageRepository from './image-repository';

window.requestAnimFrame = Utils.getRequestAnimationFrame();

/**
 * An abstract GameClient class that contains the base client logic
 */
export default class GameClient {
	/**
	 * Creates a new GameClient instance
	 * @param {Object} canvasIds
	 * @param {String} canvasWrapper
	 * @param {Object} images
	 * @param {Object} config
	 * @param {Object} customSettings
	 * @param {Object} controls
	 * @param {Object} events
	 */
	constructor(canvasIds, canvasWrapper, images, config, customSettings, controls, events) {
		this.animationFrameId;
		this.canvasIds = canvasIds;
		this.canvasWrapper = canvasWrapper;
		this.gameIsOver = false;
		this.musicIsPlaying = false;
		this.config = this.applySettings(config, customSettings);
		this.inputs;
		this.images = images;
		this.scores = {};

		//events
		this.onGameOver = events.onGameOver;
		this.playMusic = events.playMusic;
		this.playTrack = events.playTrack;

		this.gameControls = controls;

		//initialize the canvas/context objects and generate the canvas HTML elements
		this.contexts = {};

		_.forOwn(this.canvasIds, (canvasId, name) => {
			this.contexts[name] = new Context(canvasId, this.canvasWrapper, this.config.width, this.config.height);
		});
	}

	/**
	 * Preloads all the game images and calls the provided callback when done
	 * @param {Object} gameImages
	 * @param {Function} callback
	 */
	static preloadGameImages(gameImages, callback) {
		new ImageRepository(gameImages, callback);
	}

	/**
	 * Merges the defaultConfig and the customSettings
	 * @param {Object} defaultConfig
	 * @param {Object} customSettings
	 * @param {Object} settingsPathMap
	 * @returns {Object}
	 */
	applySettings(defaultConfig, customSettings, settingsPathMap) {
		const config = {
			...defaultConfig
		};

		_.forOwn(defaultConfig.configurableSettings, (predefinedValues, settingType) => {
			if (customSettings && customSettings[settingType]) {
				const path = settingsPathMap[settingType];
				const value = predefinedValues[customSettings[settingType]];
				_.set(config, path, value);
			}
		});

		return config;
	}

	/**
	 * Initializes the game entities and starts the game
	 */
	start() {
		//show all contexts and focus the game context where the inputs are handled
		_.forOwn(this.contexts, (context) => {
			context.show();
		});

		this.animationFrameId = window.requestAnimFrame(() => {
			this.gameLoop();
		});
	}

	/**
	 * Stops the game loop
	 */
	stop() {
		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}
	}

	/**
	 * Triggers the game over event and raises the game over flag
	 */
	gameOver() {
		this.gameIsOver = true;
		this.onGameOver();
	}

	/**
	 * Returns the current inputs state
	 * @returns {Object}
	 */
	getInputs() {
		throw new Error('Method "getInputs()" must be implemented.');
	}

	/**
	 * Moves the game entities every tick
	 */
	moveEntities() {
		throw new Error('Method "moveEntities()" must be implemented.');
	}

	/**
	 * Draws the game entities every tick
	 */
	drawEntities() {
		throw new Error('Method "drawEntities()" must be implemented.');
	}

	/**
	 * The game logic that runs every game tick
	 */
	gameLoop() {
		this.inputs = this.getInputs();

		//clear the whole canvas before drawing anything
		_.forOwn(this.contexts, (value, key) => {
			this.contexts[key].context.clearRect(0, 0, this.contexts[key].canvas.width, this.contexts[key].canvas.height);
		});

		//move and draw the entities
		this.moveEntities();
		this.drawEntities();

		this.animationFrameId = window.requestAnimFrame(() => {
			this.gameLoop();
		});
	}
}
