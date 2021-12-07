<template>
	<div class="game">
		<div class="canvas-wrapper"></div>

		<GameOver
			v-if="gameOver"
			@new-game="openMainMenu"
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
				'images'
			])
		},
		mounted() {
			const canvasIds = {
				background: 'background-canvas',
				game: 'game-canvas',
				enemies: 'enemies-canvas'
			};

			game = new Game(canvasIds, '.canvas-wrapper', this.images, config.game, config.defaultControls, {
				onGameOver: this.onGameOver,
				playMusic() {},
				playTrack: (track, volume) => {}
			});

			game.start();
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
			...mapActions('navigation', [
				'openMainMenu'
			]),
			/**
			 * Raises the gameOver flag and displays the game over screen
			 */
			onGameOver() {
				this.gameOver = true;
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
