<template>
	<div class="game-paused-menu">
		<div :class="['inner-wrapper', gamePausedMenuAnimationClass]">
			<img class="game-paused-menu-image" src="@/assets/img/game-paused.png" />
			<MenuButton
				title="Resume"
				@click="onResume"
			>
				Resume
			</MenuButton>
			<MenuButton
				title="Restart"
				@click="onRestart"
			>
				Restart
			</MenuButton>
			<MenuButton
				title="Main menu"
				@click="onMainMenu"
			>
				Main menu
			</MenuButton>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import MenuButton from '@/components/MenuButton';

	export default {
		components: {
			MenuButton
		},
		computed: {
			...mapState('ui', [
				'gamePaused',
				'gamePausedMenuAnimationClass'
			])
		},
		/**
		 * Attach the keydown event listener
		 */
		mounted() {
			document.addEventListener('keydown', this.onKeyPress);
		},
		/**
		 * Remove the keydown event listener
		 */
		beforeDestroy() {
			document.removeEventListener('keydown', this.onKeyPress);
		},
		methods: {
			/**
			 * Listen for the escape key press and pause/resume the game
			 */
			onKeyPress(e) {
				if (e.keyCode === 27) {
					if (this.gamePaused) {
						this.onResume();
					} else {
						this.onPause();
					}
				}
			},
			/**
			 * Emits the resume event
			 */
			onResume() {
				this.$emit('resume');
			},
			/**
			 * Emits the pause event
			 */
			onPause() {
				this.$emit('pause');
			},
			/**
			 * Emits the restart event
			 */
			onRestart() {
				this.$emit('restart');
			},
			/**
			 * Emits the main menu event
			 */
			onMainMenu() {
				this.$emit('main-menu');
			}
		}
	};
</script>

<style scoped lang="scss">
	.game-paused-menu {
		position: absolute;
		display: flex;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: 1;

		.inner-wrapper {
			padding: 20px;
			margin: auto;
			max-width: 700px;
			background-color: $transparent-background;
			border-radius: 3px;
			z-index: 1;

			.game-paused-menu-image {
				display: block;
				margin: auto;
				width: 100%;
			}
		}
	}
</style>
