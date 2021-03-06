<template>
	<div class="main-menu">
		<MainMenuBackground
			v-if="images"
			:starting-position="backgroundPosition"
			:image="menuBackground"
			:images="images"
			@before-destroy="onMainMenuBackgroundDestroyed"
		/>

		<GameHUD
			v-if="showHUD"
			:sound="sound"
			:music="music"
			@set-sound="updateSettings({ 'sound': $event })"
			@set-music="updateSettings({ 'music': $event })"
		/>

		<div :class="['inner-wrapper', mainMenuAnimationClass]">
			<img class="logo" src="@/assets/img/logo.png"/>

			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import MainMenuBackground from '@/components/MainMenuBackground';
	import GameHUD from '@/components/game-hud/GameHUD';

	export default {
		components: {
			MainMenuBackground,
			GameHUD
		},
		data() {
			return {
				menuBackground: null
			};
		},
		watch: {
			/**
			 * Watch for the selectedBackground changes and update the background in the MainMenuBackground component
			 * @param {String}
			 */
			selectedBackground(background) {
				this.menuBackground = background;
			}
		},
		computed: {
			...mapState('ui', [
				'mainMenuAnimationClass'
			]),
			...mapState('game', [
				'images',
				'backgroundPosition',
				'selectedBackground'
			]),
			...mapState('settings', [
				'sound',
				'music'
			]),
			/**
			 * Indicates whether the HUD should be visible.
			 * @returns {Boolean}
			 */
			showHUD() {
				// show the game HUD in the main menu in every section except the intro screen
				return this.$route.name !== 'intro';
			}
		},
		/**
		 * Sets the menu background or picks a random one from the list
		 */
		async created() {
			this.menuBackground = this.selectedBackground || _.sample(Object.keys(this.images.background));

			//show the main menu using a random animation
			this.showMainMenu();

			//save the background in the state
			this.setSelectedBackground(this.menuBackground);
		},
		methods: {
			...mapActions('ui', [
				'showMainMenu'
			]),
			...mapActions('game', [
				'setSelectedBackground',
				'setBackgroundPosition'
			]),
			...mapActions('settings', [
				'updateSettings'
			]),
			/**
			 * Saves the background state
			 */
			onMainMenuBackgroundDestroyed(backgroundState) {
				//save the menu background position so it can be reused in the game
				this.setBackgroundPosition(backgroundState.x);
			}
		}
	};
</script>

<style scoped lang="scss">
	.main-menu {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin: auto;
		//fix for the bounceInLeft and jackInTheBox intro animations
		overflow: visible;

		.inner-wrapper {
			height: 100%;
			padding: 20px;
			max-width: 700px;
			background-color: $transparent-background;
			border-radius: 3px;
			z-index: 1;

			.logo {
				display: block;
				margin: auto;
				width: 100%;
			}
		}

		@media (max-width: $small) {
			.inner-wrapper {
				padding: 5px;
			}
		}

		@media (max-width: $medium) {
			.game-hud {
				display: none;
			}
		}
	}
</style>
