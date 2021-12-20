<template>
	<div class="game-over">
		<div :class="['inner-wrapper', gameOverAnimationClass]">
			<img class="game-over-image" src="@/assets/img/game-over.png" />
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
				'gameOverAnimationClass'
			])
		},
		methods: {
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
	.game-over {
		position: absolute;
		display: flex;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;

		.inner-wrapper {
			padding: 20px;
			margin: auto;
			max-width: 700px;
			background-color: $transparent-background;
			border-radius: 3px;
			z-index: 1;

			.game-over-image {
				display: block;
				margin: auto;
				width: 100%;
			}

			div {
				padding: 10px;
				text-align: center;
				font-size: 24px;
			}
		}
	}
</style>
