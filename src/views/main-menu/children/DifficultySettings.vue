<template>
	<div class="difficulty-settings">
		<MainMenuSection>
			<template #title>
				Difficulty
			</template>
			<template #content>
				<div class="difficulty-picker">
					<div class="difficulty-items">
						<div
							v-for="(summary, difficulty) in difficultyItems"
							:key="difficulty"
							:class="['item', { selected: difficulty === selectedDifficulty }]"
							:title="ucfirst(difficulty)"
							@click="setSelectedDifficulty(difficulty)"
						>
							{{ difficulty }}
						</div>
					</div>

					<div class="difficulty-summary">
						<ul>
							<li
								v-for="(item, index) in difficultySummary"
								:key="index"
							>
								{{ item }}
							</li>
						</ul>
					</div>
				</div>
			</template>
			<template #buttons>
				<FormButton @click="$router.push({ name: 'character-select' })">
					Back
				</FormButton>

				<FormButton @click="$router.push({ name: 'game' })">
					Play
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
				difficultyItems: {
					easy: [
						'5 lives',
						'The game speeds up very slowly',
						'The moving platforms spawn close to each other'
					],
					medium: [
						'3 lives',
						'The game speeds up at moderate pace',
						'The moving platforms spawn at moderate distance'
					],
					hard: [
						'1 life',
						'The game speeds up very fast',
						'The moving platforms spawn farther from each other'
					]
				}
			};
		},
		computed: {
			...mapState('game', [
				'selectedDifficulty'
			]),
			difficultySummary() {
				return this.difficultyItems[this.selectedDifficulty];
			}
		},
		methods: {
			...mapActions('game', [
				'setSelectedDifficulty'
			]),
			ucfirst(text) {
				return _.upperFirst(text);
			}
		}
	};
</script>

<style scoped lang="scss">
	.difficulty-settings {
		.difficulty-picker {
			display: flex;
			margin-bottom: 10px;

			.difficulty-items {
				display: flex;
				flex: 1;
				margin: auto;

				.item {
					flex: 1;
					border-radius: 3px;
					padding: 5px 10px;
					margin: 0px 5px;
					font-size: 18px;
					text-align: center;
					user-select: none;
					text-transform: capitalize;
					font-weight: bold;
					cursor: pointer;

					&.selected {
						&:first-child {
							background-color: $green;
						}

						&:nth-child(2) {
							background-color: $yellow;
						}

						&:last-child {
							background-color: $red;
						}
					}
				}
			}

			.difficulty-summary {
				flex: 1;

				li {
					margin-bottom: 5px;
				}
			}
		}

		@media (max-width: $medium-small) {
			.difficulty-picker {
				flex-direction: column;
			}
		}
	}
</style>
