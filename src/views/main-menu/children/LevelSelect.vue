<template>
	<div class="level-select">
		<MenuPageTitle>
			Select level
		</MenuPageTitle>

		<div class="levels-list">
			<div
				v-for="(image, name) in backgroundImages"
				:key="name"
				:title="ucfirst(name)"
				:class="['level', { selected: name === selectedBackground }]"
				@click="setSelectedBackground(name)"
			>
				<img :src="image.src" />
			</div>
		</div>

		<router-link :to="{ name: 'initial-screen' }">
			Go back
		</router-link>

		<router-link :to="{ name: 'character-select' }">
			Next
		</router-link>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import MenuPageTitle from '@/components/MenuPageTitle';

	export default {
		components: {
			MenuPageTitle
		},
		data() {
			return {
				selectedLevel: null
			};
		},
		computed: {
			...mapState('game', [
				'images',
				'selectedBackground'
			]),
			backgroundImages() {
				return this.images.background;
			}
		},
		methods: {
			...mapActions('game', [
				'setSelectedBackground'
			]),
			ucfirst(text) {
				return _.upperFirst(text);
			}
		}
	};
</script>

<style scoped lang="scss">
	.level-select {
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
