<template>
	<div id="app">
		<MainMenu />
	</div>
</template>

<script>
	import MainMenu from '@/components/main-menu/MainMenu';

	export default {
		components: {
			MainMenu
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
