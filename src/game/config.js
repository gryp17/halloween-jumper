export default {
	game: {
		fps: 60,
		width: 1366,
		height: 768,
		initialSpeed: 0.6,
		speedIncrease: 0.1,
		speedUpInterval: 3000, //miliseconds
		dummy: {
			width: 90,
			height: 150,
			acceleration: 1,
			maxSpeed: 10,
			fallSpeed: 12,
			fallSpeedDead: 7,
			jumpAcceleration: 12,
			maxJumpHeight: 240,
			lives: 3,
			invincibilityDuration: 1500 //miliseconds
		},
		background: {
			speed: 0.6,
			availableBackgrounds: [
				'forest',
				'factory',
				'graveyard',
				'house'
			],
			selectedBackground: 'factory' //this value is actually randomized before starting the game
		},
		platform: {
			sizes: {
				large: {
					width: 248,
					height: 57
				},
				medium: {
					width: 140,
					height: 55
				},
				small: {
					width: 96,
					height: 53
				}
			},
			minDistance: 40,
			maxDistance: 250,
			minHeight: 500,
			maxHeight: 650,
			chanceToFloat: 33, //%
			floatSpeed: 1, //between 1 and -1
			minFloatDistance: 30,
			maxFloatDistance: 80
		},
		bat: {
			size: 100,
			speed: 5,
			deadSpeed: 3,
			fallingSpeed: 6,
			deadRotationSpeed: 2,
			minSpawnDistance: 1200,
			maxSpawnDistance: 2000,
			minSpawnHeight: 100,
			maxSpawnHeight: 350
		},
		spider: {
			size: 80,
			netWidth: 1,
			speed: 1,
			fallingSpeed: 8,
			minSpawnDistance: 100,
			maxSpawnDistance: 400,
			minHangOffset: 200,
			maxHangOffset: 350,
			minHangTime: 1000, //miliseconds
			maxHangTime: 6000
		},
		ghost: {
			size: 100,
			speed: 3,
			deadSpeed: 1,
			fallingSpeed: 3,
			deadRotationSpeed: 15,
			deadFadeSpeed: 0.01,
			deadShrinkSpeed: 1,
			minSpawnDistance: 1000,
			maxSpawnDistance: 1500,
			minSpawnHeight: 100,
			maxSpawnHeight: 350,
			minFloatDistance: 60,
			maxFloatDistance: 200,
			floatSpeed: 0.5
		},
		configurableSettings: {
			gameSpeed: {
				slow: 6000,
				default: 2000, //affects the speedUpInterval value
				fast: 800
			},
			background: {
				default: 'default',
				forest: 'forest',
				factory: 'factory',
				graveyard: 'graveyard',
				house: 'house'
			},
			lives: {
				high: 5,
				default: 3,
				low: 1
			},
			platformsDistance: {
				small: 150,
				default: 240, //affects the maxDistance value
				big: 320
			}
		}
	},
	menu: {
		width: 1366,
		height: 768,
		background: {
			speed: 0.6
		}
	},
	defaultControls: {
		up: {
			keys: [38, 87] //arrow up, W
		},
		down: {
			keys: [40, 83] //arrow down, S
		},
		left: {
			keys: [37, 65] //left arrow, A
		},
		right: {
			keys: [39, 68] //right arrow, D
		}
	},
	validInputKeyCodes: {
		9: 'tab',
		16: 'shift',
		17: 'ctrl',
		18: 'alt',
		20: 'caps lock',
		32: 'spacebar',
		33: 'page up',
		34: 'page down',
		35: 'end',
		36: 'home',
		37: 'left arrow',
		38: 'up arrow',
		39: 'right arrow',
		40: 'down arrow',
		45: 'insert',
		46: 'delete',
		48: '0',
		49: '1',
		50: '2',
		51: '3',
		52: '4',
		53: '5',
		54: '6',
		55: '7',
		56: '8',
		57: '9',
		65: 'a',
		66: 'b',
		67: 'c',
		68: 'd',
		69: 'e',
		70: 'f',
		71: 'g',
		72: 'h',
		73: 'i',
		74: 'j',
		75: 'k',
		76: 'l',
		77: 'm',
		78: 'n',
		79: 'o',
		80: 'p',
		81: 'q',
		82: 'r',
		83: 's',
		84: 't',
		85: 'u',
		86: 'v',
		87: 'w',
		88: 'x',
		89: 'y',
		90: 'z',
		96: 'numpad 0',
		97: 'numpad 1',
		98: 'numpad 2',
		99: 'numpad 3',
		100: 'numpad 4',
		101: 'numpad 5',
		102: 'numpad 6',
		103: 'numpad 7',
		104: 'numpad 8',
		105: 'numpad 9',
		108: 'numpad period'
	}
};
