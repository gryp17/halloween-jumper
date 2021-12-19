<template>
	<div class="game">
		<div class="canvas-wrapper"></div>

		<GameHUD
			:lives="lives"
			:dummy-image="hudDummyImage"
			:sound="sound"
			:music="music"
			@set-sound="updateSettings({ 'sound': $event })"
			@set-music="updateSettings({ 'music': $event })"
		/>

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

	import GameHUD from '@/components/game-hud/GameHUD';
	import GameOver from '@/components/GameOver';

	let game;

	export default {
		components: {
			GameHUD,
			GameOver
		},
		data() {
			return {
				lives: 0
			};
		},
		computed: {
			...mapState('game', [
				'images',
				'backgroundPosition',
				'selectedBackground',
				'selectedDummy',
				'selectedDifficulty'
			]),
			...mapState('settings', [
				'controls',
				'sound',
				'music'
			]),
			...mapState('ui', [
				'gameOver'
			]),
			/**
			 * Returns the correct dummy image depending on the selected dummy
			 * @returns {String}
			 */
			hudDummyImage() {
				if (this.selectedDummy === 'green') {
					return this.images.dummy.green.right.idle[0].src;
				}

				return this.images.dummy.yellow.right.idle[0].src;
			}
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
		},
		methods: {
			...mapActions('game', [
				'setSelectedBackground',
				'setBackgroundPosition'
			]),
			...mapActions('settings', [
				'updateSettings'
			]),
			...mapActions('ui', [
				'showGameOver',
				'hideGameOver'
			]),
			...mapActions('audio', [
				'playTrack',
				'playMusic',
				'stopMusic'
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

				const difficultySettings = config.game.difficulties[this.selectedDifficulty];

				const customSettings = {
					...difficultySettings,
					background: this.selectedBackground,
					skin: this.selectedDummy
				};

				game = new Game(canvasIds, '.canvas-wrapper', this.images, config.game, customSettings, this.controls, {
					onUpdateHUD: this.updateHUD,
					onGameOver: this.showGameOver,
					playMusic: this.playMusic,
					playTrack: (track, volume) => {
						this.playTrack({
							track,
							volume
						});
					}
				});

				game.start();

				//start the game from the same background position as the main menu background
				game.background.x = this.backgroundPosition;
			},
			/**
			 * Saves the background position and image so they can be reused in the main menu or when restarting the game
			 */
			saveBackgroundParams() {
				this.setSelectedBackground(game.background.state.selectedBackground);
				this.setBackgroundPosition(game.background.state.x);
			},
			/**
			 * Updates the game hud
			 * @param {Object} hudData
			 */
			updateHUD(hudData) {
				this.lives = hudData.lives;
			},
			/**
			 * Restarts the game with the same settings
			 */
			async onRestart() {
				await this.hideGameOver();
				this.saveBackgroundParams();
				game.stop();
				this.initGame();
			},
			/**
			 * Opens the main menu screen
			 */
			async onOpenMainMenu() {
				await this.hideGameOver();
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
