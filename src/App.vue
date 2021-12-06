<template>
	<div id="app">
		<LoadingIndicator
			v-if="loading"
			full-screen
		/>
		<template v-else>
			<MainMenu v-if="menuIsOpened" />
			<Game v-if="gameIsOpened" v />
		</template>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import LoadingIndicator from '@/components/LoadingIndicator';
	import MainMenu from '@/components/main-menu/MainMenu';
	import Game from '@/components/Game';

	export default {
		components: {
			LoadingIndicator,
			MainMenu,
			Game
		},
		data() {
			return {
				loading: true
			};
		},
		computed: {
			...mapGetters('navigation', [
				'menuIsOpened',
				'gameIsOpened'
			])
		},
		async mounted() {
			await this.preloadGameImages();
			this.loading = false;
		},
		methods: {
			...mapActions('game', [
				'preloadGameImages'
			])
		}
	};
</script>

<style lang="scss">
	*,
	:after,
	:before {
		box-sizing:border-box;
	}

	body, html {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	body {
		font-family:  $font-family;
		color: $text-color;

		//prevent the page refresh on scroll on mobile devices
		overscroll-behavior-y: contain;

		:focus {
			outline: none;
		}

		::-moz-focus-inner {
			border: 0;
		}

		input {
			filter: none;
		}

		button:focus {
			outline: none;
		}

		#app {
			display: flex;
			flex-direction: column;
			height: 100%;
		}
	}
</style>
