<template>
	<div class="game-over">
		<div :class="['inner-wrapper', wrapperClass]">
			<img class="game-over-image" src="@/assets/img/game-over.png" />
			<div @click="onRestart">
				Restart
			</div>
			<div @click="onMainMenu">
				Main menu
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';

	export default {
		data() {
			return {
				wrapperClass: ''
			};
		},
		computed: {
			...mapState('ui', [
				'animations'
			]),
			...mapGetters('ui', [
				'showAnimation',
				'hideAnimation'
			])
		},
		created() {
			this.wrapperClass = this.showAnimation;
		},
		methods: {
			async onRestart() {
				await this.hidePanel();
				this.$emit('restart');
			},
			async onMainMenu() {
				await this.hidePanel();
				this.$emit('main-menu');
			},
			/**
			 * Applies the hide animation to the game over panel
			 * @returns {Promise}
			 */
			hidePanel() {
				return new Promise((resolve) => {
					this.wrapperClass = this.hideAnimation;
					setTimeout(resolve, this.animations.duration);
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.game-over {
		position: absolute;
		display: flex;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;

		.inner-wrapper {
			padding: 20px;
			margin: auto;
			max-width: 700px;
			background-color: $transparent-background;
			border-radius: 3px;
			z-index: 1;

			.game-over-image {
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
	}
</style>
