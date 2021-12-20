<template>
	<div class="game">
		<div class="canvas-wrapper"></div>

		<GameHUD
			:lives="lives"
			:dummy-image="hudDummyImage"
			:sound="sound"
			:music="music"
			@set-sound="onUpdateSettings({ 'sound': $event })"
			@set-music="onUpdateSettings({ 'music': $event })"
			@pause="onPause"
		/>

		<GameOverMenu
			v-show="gameOver"
			@restart="onRestart"
			@main-menu="onOpenMainMenu"
		/>

		<GamePausedMenu
			v-show="gamePaused"
			@resume="onResume"
			@pause="onPause"
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
	import GameOverMenu from '@/components/GameOverMenu';
	import GamePausedMenu from '@/components/GamePausedMenu';

	let game;

	export default {
		components: {
			GameHUD,
			GameOverMenu,
			GamePausedMenu
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
				'gameOver',
				'gamePaused'
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
				'showGameOverMenu',
				'hideGameOverMenu',
				'showGamePausedMenu',
				'hideGamePausedMenu'
			]),
			...mapActions('audio', [
				'playTrack'
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
					onGameOver: this.showGameOverMenu,
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
			 * Updates the audio settings and gives back focus to the game canvas
			 */
			onUpdateSettings(settings) {
				this.updateSettings(settings);
				game.focus();
			},
			/**
			 * Updates the game hud
			 * @param {Object} hudData
			 */
			updateHUD(hudData) {
				this.lives = hudData.lives;
			},
			/**
			 * Pauses the game
			 */
			onPause() {
				if (this.gameOver) {
					return;
				}

				this.showGamePausedMenu();
				game.pause();
			},
			/**
			 * Resumes the game
			 */
			async onResume() {
				await this.hideGamePausedMenu();
				game.focus();
				game.resume();
			},
			/**
			 * Restarts the game with the same settings
			 */
			async onRestart() {
				await Promise.all([
					this.hideGameOverMenu(),
					this.hideGamePausedMenu()
				]);

				this.saveBackgroundParams();
				game.stop();
				this.initGame();
			},
			/**
			 * Opens the main menu screen
			 */
			async onOpenMainMenu() {
				await Promise.all([
					this.hideGameOverMenu(),
					this.hideGamePausedMenu()
				]);

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
