<template>
	<div class="main-menu">
		<MainMenuBackground
			v-if="images"
			:images="images"
		/>

		<div class="inner-wrapper">
			<img class="logo" src="@/assets/img/logo.png"/>

			<div @click="openGame">
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
		computed: {
			...mapState('game', [
				'images'
			])
		},
		methods: {
			...mapActions('navigation', [
				'openGame'
			])
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
