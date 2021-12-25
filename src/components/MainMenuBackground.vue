<template>
	<div class="main-menu-background"></div>
</template>

<script>
	import config from '@/game/config';
	import MenuBackground from '@/game/menu-background/entry-points/menu-background';

	let menuBackground;

	export default {
		props: {
			startingPosition: {
				type: Number,
				default: 0
			},
			image: {
				type: String,
				required: true
			},
			images: {
				type: Object,
				required: true
			}
		},
		/**
		 * Initializes the MenuBackground canvas animation
		 */
		mounted() {
			const canvasIds = {
				background: 'menu-background'
			};

			const menuConfig = {
				...config.menu
			};

			//set the selected background image
			menuConfig.background.selectedBackground = this.image;

			menuBackground = new MenuBackground(canvasIds, '.main-menu-background', this.images, menuConfig);
			menuBackground.start();

			//move the background image to the specified position
			menuBackground.background.x = this.startingPosition;
		},
		/**
		 * Stops the game loop before destroying the component
		 */
		beforeDestroy() {
			if (menuBackground) {
				menuBackground.stop();

				//on before destroy send the current background state
				this.$emit('before-destroy', this.getBackgroundState());
			}
		},
		methods: {
			/**
			 * Returns the current background state
			 * @returns {Object}
			 */
			getBackgroundState() {
				return menuBackground.background.state;
			}
		}
	};
</script>

<style lang="scss">
	.main-menu-background {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100vh;
		z-index: 1;

		.canvas {
			position: absolute;
			top: 0;
			left: 0;
			display: none;
			width: 100%;
			height: 100%;
		}
	}
</style>
