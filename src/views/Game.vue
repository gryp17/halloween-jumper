<template>
	<div class="game">
		<div class="canvas-wrapper"></div>

		<GameOver
			v-if="gameOver"
			@restart="onRestart"
			@main-menu="onOpenMainMenu"
		/>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import Game from '@/game/jumper/entry-points/game';
	import config from '@/game/config';

	import GameOver from '@/components/GameOver';

	let game;

	export default {
		components: {
			GameOver
		},
		data() {
			return {
				gameOver: false
			};
		},
		computed: {
			...mapState('game', [
				'images',
				'backgroundPosition',
				'backgroundImage'
			])
		},
		/**
		 * Starts the game
		 */
		mounted() {
			this.initGame();
		},
		/**
		 * Stops the game if it's still running
		 */
		beforeDestroy() {
			if (game) {
				game.stop();
			}

			//TODO: implement the sound/music
			// this.stopMusic();
		},
		methods: {
			...mapActions('game', [
				'setBackgroundState'
			]),
			/**
			 * Starts the game
			 */
			initGame() {
				const canvasIds = {
					background: 'background-canvas',
					game: 'game-canvas',
					enemies: 'enemies-canvas'
				};

				//use the same background image as the main menu background
				const customSettings = {
					background: this.backgroundImage
				};

				game = new Game(canvasIds, '.canvas-wrapper', this.images, config.game, customSettings, config.defaultControls, {
					onGameOver: this.onGameOver,
					playMusic() {},
					playTrack: (track, volume) => {}
				});

				game.start();

				//start the game from the same background position as the main menu background
				game.background.x = this.backgroundPosition;
			},
			/**
			 * Raises the gameOver flag and displays the game over screen
			 */
			onGameOver() {
				this.gameOver = true;
			},
			/**
			 * Saves the background position and image so they can be reused in the main menu or when restarting the game
			 */
			saveBackgroundParams() {
				this.setBackgroundState(game.background.state);
			},
			/**
			 * Restarts the game with the same settings
			 */
			onRestart() {
				this.saveBackgroundParams();
				this.gameOver = false;
				game.stop();
				this.initGame();
			},
			/**
			 * Opens the main menu screen
			 */
			onOpenMainMenu() {
				this.saveBackgroundParams();

				this.$router.push({
					name: 'initial-screen'
				});
			}
		}
	};
</script>

<style lang="scss">
	.game {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: $gray-dark;

		.canvas-wrapper {
			position: relative;
			width: 100%;
			height: 100%;

			.canvas {
				position: absolute;
				top: 0;
				left: 0;
				display: none;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
