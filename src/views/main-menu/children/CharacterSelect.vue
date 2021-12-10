<template>
	<div class="character-select">
		<MenuPageTitle>
			Select character
		</MenuPageTitle>

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

		<router-link :to="{ name: 'level-select' }">
			Go back
		</router-link>

		<router-link :to="{ name: 'difficulty-settings' }">
			Next
		</router-link>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import MenuPageTitle from '@/components/MenuPageTitle';
	import greenGIF from '@/assets/img/dummy-preview/green.gif';
	import yellowGIF from '@/assets/img/dummy-preview/yellow.gif';

	export default {
		components: {
			MenuPageTitle
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
