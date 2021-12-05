<template>
	<div class="main-menu-background"></div>
</template>

<script>
	import config from '@/game/config';
	import MenuBackground from '@/game/menu-background/entry-points/menu-background';

	export default {
		props: {
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

			//set the selected background by selecting a random background image
			menuConfig.background.selectedBackground = _.sample(Object.keys(this.images));

			const menuBackground = new MenuBackground(canvasIds, '.main-menu-background', this.images, menuConfig);
			menuBackground.start();
		}
	};
</script>

<style lang="scss">
	.main-menu-background {
		position: absolute;
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
</style>
