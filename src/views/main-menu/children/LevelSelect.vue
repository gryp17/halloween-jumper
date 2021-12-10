<template>
	<div class="level-select">
		<MainMenuSection>
			<template #title>
				Select level
			</template>
			<template #content>
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
			</template>
			<template #buttons>
				<FormButton @click="$router.push({ name: 'initial-screen' })">
					Back
				</FormButton>

				<FormButton @click="$router.push({ name: 'character-select' })">
					Next
				</FormButton>
			</template>
		</MainMenuSection>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import MainMenuSection from '@/components/MainMenuSection';

	export default {
		components: {
			MainMenuSection
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
