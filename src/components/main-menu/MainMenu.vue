<template>
	<div class="main-menu">
		<MainMenuBackground
			v-if="images"
			ref="menuBackground"
			:starting-position="backgroundPosition"
			:image="menuBackground"
			:images="images"
		/>

		<div class="inner-wrapper">
			<img class="logo" src="@/assets/img/logo.png"/>

			<div @click="onOpenGame">
				Play
			</div>
			<div>
				Settings
			</div>
			<div>
				About
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import MainMenuBackground from '@/components/main-menu/MainMenuBackground';

	export default {
		components: {
			MainMenuBackground
		},
		data() {
			return {
				menuBackground: null
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
		 * Sets the menu background or picks a random one from the list
		 */
		created() {
			this.menuBackground = this.backgroundImage || _.sample(Object.keys(this.images.background));
		},
		methods: {
			...mapActions('navigation', [
				'openGame'
			]),
			...mapActions('game', [
				'setBackgroundState'
			]),
			/**
			 * Saves the background state and starts a new game
			 */
			onOpenGame() {
				//save the menu background position and image so it can be reused in the game
				const state = this.$refs.menuBackground.getBackgroundState();

				this.setBackgroundState(state);

				this.openGame();
			}
		}
	};
</script>

<style scoped lang="scss">
	.main-menu {
		display: flex;
		width: 100%;
		height: 100%;

		.inner-wrapper {
			padding: 20px;
			margin: auto;
			max-width: 700px;
			background-color: $transparent-background;
			border-radius: 3px;
			z-index: 1;

			.logo {
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

		@media (max-width: $small) {
			.inner-wrapper {
				padding: 5px;
			}
		}
	}
</style>
