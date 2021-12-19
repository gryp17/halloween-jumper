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
			])
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
		}

		@media (max-width: $small) {
			.inner-wrapper {
				padding: 5px;
			}
		}
	}
</style>
