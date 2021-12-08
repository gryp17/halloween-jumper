<template>
	<div id="app">
		<LoadingIndicator
			v-if="loading"
			full-screen
		/>
		<router-view v-else />
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import LoadingIndicator from '@/components/LoadingIndicator';

	export default {
		components: {
			LoadingIndicator
		},
		data() {
			return {
				loading: true
			};
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
