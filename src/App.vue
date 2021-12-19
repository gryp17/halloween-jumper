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
	import Vue from 'vue';
	import { mapActions } from 'vuex';
	import LoadingIndicator from '@/components/LoadingIndicator';

	import FormButton from '@/components/forms/FormButton';
	import FormSwitch from '@/components/forms/FormSwitch';
	import FormInput from '@/components/forms/FormInput';

	import keyCodesMap from '@/filters/keyCodesMap';

	//global components
	Vue.component('FormButton', FormButton);
	Vue.component('FormSwitch', FormSwitch);
	Vue.component('FormInput', FormInput);

	//global filters
	Vue.filter('keyCodesMap', keyCodesMap);

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
			await Promise.all([
				this.preloadGameImages(),
				this.getSettings()
			]);
			this.loading = false;
		},
		methods: {
			...mapActions('game', [
				'preloadGameImages'
			]),
			...mapActions('settings', [
				'getSettings'
			])
		}
	};
</script>

<style lang="scss">
	@import '~@/assets/css/_vue-tabs';
	@import '~@/assets/css/_vue-slider';

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
