<template>
	<div class="level-select">
		<div class="page-title">
			Select level
		</div>

		<div class="levels-list">
			<div
				v-for="(image, name) in backgroundImages"
				:key="name"
				:title="ucfirst(name)"
				:class="['level', { selected: name === selectedLevel }]"
				@click="selectLevel(name)"
			>
				<img :src="image.src" />
			</div>
		</div>

		<router-link :to="{ name: 'game' }">
			Start
		</router-link>

		<router-link :to="{ name: 'initial-screen' }">
			Go back
		</router-link>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	export default {
		data() {
			return {
				selectedLevel: null
			};
		},
		computed: {
			...mapState('game', [
				'images',
				'backgroundImage'
			]),
			backgroundImages() {
				return this.images.background;
			}
		},
		created() {
			this.selectedLevel = this.backgroundImage;
		},
		methods: {
			...mapActions('game', [
				'setBackgroundState'
			]),
			ucfirst(text) {
				return _.upperFirst(text);
			},
			selectLevel(level) {
				this.selectedLevel = level;

				this.setBackgroundState({
					selectedBackground: this.selectedLevel
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.level-select {
		.page-title {
			padding: 20px;
			font-size: 24px;
			text-align: center;
		}

		.levels-list {
			display: flex;
			flex-wrap: wrap;

			.level {
				width: 25%;
				padding: 5px;
				cursor: pointer;

				img {
					width: 100%;
					height: 30vw;
					max-height: 165px;
					object-fit: cover;
					object-position: left;
					border: solid 2px transparent;
					border-radius: 8px;
				}

				&.selected {
					img {
						border-color: $orange;
					}
				}
			}
		}

		@media (max-width: $small) {
			.levels-list {
				.level {
					width: 50%;
				}
			}
		}
	}
</style>
