<template>
	<div class="main-menu">
		<MainMenuBackground
			v-if="images"
			:starting-position="backgroundPosition"
			:image="menuBackground"
			:images="images"
			@before-destroy="onMainMenuBackgroundDestroyed"
		/>

		<div class="inner-wrapper">
			<img class="logo" src="@/assets/img/logo.png"/>

			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import MainMenuBackground from '@/components/MainMenuBackground';

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
				'selectedBackground'
			])
		},
		/**
		 * Sets the menu background or picks a random one from the list
		 */
		created() {
			this.menuBackground = this.selectedBackground || _.sample(Object.keys(this.images.background));

			//save the background in the state
			this.setSelectedBackground(this.menuBackground);
		},
		methods: {
			...mapActions('game', [
				'setSelectedBackground',
				'setBackgroundPosition'
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

			&.fade-out {
				opacity: 0;
				transform: scale(0.4);
			}

			&.fade-in {
				transition:
					transform 600ms ease-out,
					opacity 1300ms ease-out,
					padding 300ms ease-out;
				opacity: 1;
				transform: scale(1);
			}

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
