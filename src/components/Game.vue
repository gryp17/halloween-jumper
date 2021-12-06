<template>
	<div class="game">
		<div class="canvas-wrapper"></div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import Game from '@/game/jumper/entry-points/game';
	import config from '@/game/config';

	let game;

	export default {
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

			game = new Game(canvasIds, '.canvas-wrapper', this.images, config.game, this.controls, 1, {
				/*
				onUpdateInputs: this.updateInputs,
				playMusic: this.playMusic,
				playTrack: (track, volume) => {
					this.playTrack({
						track,
						volume
					});
				}
				*/
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
			])
		}
	};
</script>

<style lang="scss">
	.game {
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
