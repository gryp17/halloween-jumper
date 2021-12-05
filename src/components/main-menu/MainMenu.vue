<template>
	<div class="main-menu">
		<LoadingIndicator
			v-if="loading"
			full-screen
		/>
		<template v-else>
			<MainMenuBackground
				:images="mainMenuBackgrounds"
			/>

			<div class="inner-wrapper">
				<img class="logo" src="@/assets/img/logo.png"/>

				<div>
					Play
				</div>
				<div>
					Settings
				</div>
				<div>
					About
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import Game from '@/game/jumper/entry-points/game';
	import LoadingIndicator from '@/components/LoadingIndicator';
	import MainMenuBackground from '@/components/main-menu/MainMenuBackground';

	export default {
		components: {
			LoadingIndicator,
			MainMenuBackground
		},
		data() {
			return {
				mainMenuBackgrounds: null,
				loading: true
			};
		},
		mounted() {
			Game.preloadGameImages((images) => {
				this.mainMenuBackgrounds = images.background;
				this.loading = false;
			});
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
			background-color: rgba($black, 0.6);
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
