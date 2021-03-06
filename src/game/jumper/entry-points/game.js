import _ from 'lodash';
import GameClient from '../../common/game-client';
import Keyboard from '../../common/inputs/keyboard';
import Touchscreen from '../inputs/touchscreen';
import Background from '../game-entities/background';
import Platform from '../game-entities/platform';
import Bat from '../game-entities/bat';
import Ghost from '../game-entities/ghost';
import Spider from '../game-entities/spider';
import Dummy from '../game-entities/dummy';
import gameImages from '../resources/images';

/**
 * Jumper client class
 */
export default class Jumper extends GameClient {
	/**
	 * Creates a new jumper client instance
	 * @param {Object} canvasIds
	 * @param {String} canvasWrapper
	 * @param {Object} images
	 * @param {Object} config
	 * @param {Object} customSettings
	 * @param {Object} controls
	 * @param {Object} events
	 */
	constructor(canvasIds, canvasWrapper, images, config, customSettings, controls, events) {
		super(canvasIds, canvasWrapper, images, config, customSettings, controls, events);

		this.gameSpeed = this.config.initialSpeed;
		this.speedIncrease = this.config.speedIncrease;
		this.speedUpInterval = this.config.speedUpInterval;
		this.speedUpIntervalId;

		this.background;
		this.platforms = [];
		this.enemies = [];
		this.dummy;

		//initialize the keyboard and touchscreen controls
		this.keyboard = new Keyboard(this.gameControls, this.contexts.game.canvas);
		this.touchscreen = new Touchscreen(this.gameControls, this.contexts.game.canvas);
	}

	/**
	 * Merges the defaultConfig and the customSettings
	 * @param {Object} defaultConfig
	 * @param {Object} customSettings
	 * @returns {Object}
	 */
	applySettings(defaultConfig, customSettings) {
		//map each setting type to the path in the config that it corresponds to
		const settingsPathMap = {
			gameSpeed: 'speedUpInterval',
			background: 'background.selectedBackground',
			lives: 'dummy.lives',
			platformsDistance: 'platform.maxDistance',
			skin: 'dummy.selectedSkin'
		};

		return super.applySettings(defaultConfig, customSettings, settingsPathMap);
	}

	/**
	 * Returns the HUD data
	 * @returns {Object}
	 */
	get hudData() {
		return {
			lives: this.dummy.lives
		};
	}

	/**
	 * Preloads all the game images and calls the provided callback when done
	 * @param {Function} callback
	 */
	static preloadGameImages(callback) {
		super.preloadGameImages(gameImages, callback);
	}

	/**
	 * Initializes the game entities and starts the game
	 */
	start() {
		const platformsConfig = [
			this.config.platform.sizes,
			this.config.platform.minDistance,
			this.config.platform.maxDistance,
			this.config.platform.minHeight,
			this.config.platform.maxHeight,
			this.config.platform.chanceToFloat,
			this.config.platform.floatSpeed,
			this.config.platform.minFloatDistance,
			this.config.platform.maxFloatDistance
		];

		const dummyConfig = [
			this.config.dummy.width,
			this.config.dummy.height,
			this.config.dummy.selectedSkin,
			this.config.dummy.lives,
			this.config.dummy.invincibilityDuration,
			this.config.dummy.acceleration,
			this.config.dummy.maxSpeed,
			this.config.dummy.fallSpeed,
			this.config.dummy.fallSpeedDead,
			this.config.dummy.jumpAcceleration,
			this.config.dummy.maxJumpHeight
		];

		//game objects
		this.background = new Background(
			this,
			this.config.background.speed,
			this.config.background.selectedBackground
		);

		this.platforms = [
			new Platform(this, 'large', 600, 530, ...platformsConfig),
			new Platform(this, 'medium', 900, 500, ...platformsConfig),
			new Platform(this, 'large', 1060, 520, ...platformsConfig),
			new Platform(this, 'small', 1320, 540, ...platformsConfig),
			new Platform(this, 'medium', 1460, 560, ...platformsConfig),
			new Platform(this, 'large', 1650, 570, ...platformsConfig),
			new Platform(this, 'small', 1920, 500, ...platformsConfig),
			new Platform(this, 'small', 2030, 540, ...platformsConfig)
		];

		this.enemies = [
			new Spider(
				this,
				this.config.spider.size,
				1300,
				this.config.spider.size * -1,
				this.config.spider.netWidth,
				this.config.spider.speed,
				this.config.spider.fallingSpeed,
				this.config.spider.minSpawnDistance,
				this.config.spider.maxSpawnDistance,
				this.config.spider.minHangOffset,
				this.config.spider.maxHangOffset,
				this.config.spider.minHangTime,
				this.config.spider.maxHangTime
			),
			new Ghost(
				this,
				this.config.ghost.size,
				4000,
				300,
				this.config.ghost.speed,
				this.config.ghost.deadSpeed,
				this.config.ghost.fallingSpeed,
				this.config.ghost.deadRotationSpeed,
				this.config.ghost.deadFadeSpeed,
				this.config.ghost.deadShrinkSpeed,
				this.config.ghost.minSpawnDistance,
				this.config.ghost.maxSpawnDistance,
				this.config.ghost.minSpawnHeight,
				this.config.ghost.maxSpawnHeight,
				this.config.ghost.minFloatDistance,
				this.config.ghost.maxFloatDistance,
				this.config.ghost.floatSpeed
			),
			new Bat(
				this,
				this.config.bat.size,
				4700,
				200,
				this.config.bat.speed,
				this.config.bat.deadSpeed,
				this.config.bat.fallingSpeed,
				this.config.bat.deadRotationSpeed,
				this.config.bat.minSpawnDistance,
				this.config.bat.maxSpawnDistance,
				this.config.bat.minSpawnHeight,
				this.config.bat.maxSpawnHeight
			)
		];

		this.dummy = new Dummy(
			this,
			...dummyConfig
		);

		//listen for the keyboard and touchscreen events
		this.keyboard.listen();
		this.touchscreen.listen();

		this.startSpeedUpInterval();

		this.updateHUD();

		super.start();
	}

	/**
	 * Stops the game
	 */
	stop() {
		this.cleanUp();
		super.stop();
	}

	/**
	 * Pauses the game
	 */
	pause() {
		super.pause();
		this.clearSpeedUpInterval();
	}

	/**
	 * Resumes the game
	 */
	resume() {
		if (this.gameIsPaused) {
			super.resume();
			this.startSpeedUpInterval();
		}
	}

	/**
	 * Cleans up all event handlers and timeouts/intervals
	 */
	cleanUp() {
		this.removeEventListeners();
		this.clearSpeedUpInterval();
	}

	/**
	 * Removes all event listeners
	 */
	removeEventListeners() {
		this.keyboard.removeAllEventListeners();
		this.touchscreen.removeAllEventListeners();
	}

	/**
	 * Starts the speed up interval
	 */
	startSpeedUpInterval() {
		this.clearSpeedUpInterval();

		this.speedUpIntervalId = setInterval(() => {
			this.speedUp();
		}, this.speedUpInterval);
	}

	/**
	 * Clear speed up interval
	 */
	clearSpeedUpInterval() {
		clearInterval(this.speedUpIntervalId);
	}

	/**
	 * Triggers the game over event and raises the game over flag
	 */
	gameOver() {
		this.playGameOverSound();

		this.cleanUp();
		super.gameOver();
	}

	/**
	 * Emits the update hud event with the hud data
	 */
	updateHUD() {
		this.onUpdateHUD(this.hudData);
	}

	/**
	 * Speeds up the game
	 */
	speedUp() {
		this.gameSpeed = parseFloat((this.gameSpeed + this.speedIncrease).toFixed(1));
	}

	/**
	 * Plays the jump sound track
	 */
	playJumpSound() {
		this.playTrack('jump', 0.3);
	}

	/**
	 * Plays the flip sound track
	 */
	playFlipSound() {
		this.playTrack('flip');
	}

	/**
	 * Plays the dead sound track
	 */
	playDeadSound() {
		this.playTrack('dead');
	}

	/**
	 * Plays the game over sound track
	 */
	playGameOverSound() {
		this.playTrack('gameOver');
	}

	/**
	 * Returns the current inputs state
	 * @returns {Object}
	 */
	getInputs() {
		const result = {};

		//get both types of inputs
		const keyboardInputs = this.keyboard.getInputs();
		const touchscreenInputs = this.touchscreen.getInputs();

		//and merge them
		_.forOwn(this.gameControls, (data, key) => {
			result[key] = keyboardInputs[key] || touchscreenInputs[key];
		});

		return result;
	}

	/**
	 * Moves the game entities every tick
	 */
	moveEntities() {
		this.background.move();
		this.platforms.forEach((platform) => {
			platform.move();
		});

		this.enemies.forEach((enemy) => {
			enemy.move();
		});

		this.dummy.move();
	}

	/**
	 * Draws the game entities every tick
	 */
	drawEntities() {
		this.background.draw();

		this.platforms.forEach((platform) => {
			platform.draw();
		});

		this.enemies.forEach((enemy) => {
			enemy.draw();
		});

		this.dummy.draw();
	}
}
