<template>
	<div class="character-select">
		<MainMenuSection>
			<template #title>
				Select character
			</template>
			<template #content>
				<div class="dummies-list">
					<div
						v-for="(dummy, index) in dummyImages"
						:key="index"
						:class="['dummy', { selected: dummy.skin === selectedDummy }]"
						:title="dummy.label"
						@click="setSelectedDummy(dummy.skin)"
					>
						<img class="static-image" :src="dummy.image" />
						<img class="dummy-gif" :src="dummy.gif" />
					</div>
				</div>
			</template>
			<template #buttons>
				<FormButton @click="$router.push({ name: 'level-select' })">
					Back
				</FormButton>

				<FormButton @click="$router.push({ name: 'difficulty-settings' })">
					Next
				</FormButton>
			</template>
		</MainMenuSection>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import MainMenuSection from '@/components/MainMenuSection';
	import greenGIF from '@/assets/img/dummy-preview/green.gif';
	import yellowGIF from '@/assets/img/dummy-preview/yellow.gif';

	export default {
		components: {
			MainMenuSection
		},
		computed: {
			...mapState('game', [
				'images',
				'selectedDummy'
			]),
			dummyImages() {
				return [
					{
						skin: 'green',
						label: 'Croc Boy',
						image: this.images.dummy.green.right.idle[0].src,
						gif: greenGIF
					},
					{
						skin: 'yellow',
						label: 'Dennis The Menace',
						image: this.images.dummy.yellow.right.idle[0].src,
						gif: yellowGIF
					}
				];
			}
		},
		methods: {
			...mapActions('game', [
				'setSelectedDummy'
			])
		}
	};
</script>

<style scoped lang="scss">
	.character-select {
		.dummies-list {
			display: flex;
			justify-content: center;

			.dummy {
				margin: 10px;
				padding: 15px;
				border: solid 2px transparent;
				border-radius: 8px;
				cursor: pointer;

				img {
					width: 80px;
					height: 115px;
				}

				.dummy-gif {
					display: none;
				}

				&.selected {
					border-color: $orange;

					.dummy-gif {
						display: block;
					}

					.static-image {
						display: none;
					}
				}
			}
		}
	}
</style>
