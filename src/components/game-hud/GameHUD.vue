<template>
	<div class="game-hud">

		<LivesDisplay
			v-if="lives && dummyImage"
			:lives="lives"
			:dummy-image="dummyImage"
		/>

		<div class="buttons-wrapper">
			<GameHUDButton
				title="Toggle sound effects"
				:active="sound"
				@click="setSoundPreference('sound', !sound)"
			>
				<font-awesome-icon :icon="['fas', 'volume-up']" />
			</GameHUDButton>

			<GameHUDButton
				title="Toggle music"
				:active="music"
				@click="setSoundPreference('music', !music)"
			>
				<font-awesome-icon :icon="['fas', 'music']" />
			</GameHUDButton>

			<GameHUDButton
				v-if="showPauseButton"
				title="Pause game"
				:active="paused"
				@click="pause"
			>
				<font-awesome-icon :icon="['fas', 'pause']" />
			</GameHUDButton>
		</div>
	</div>
</template>

<script>
	import GameHUDButton from '@/components/game-hud/GameHUDButton';
	import LivesDisplay from '@/components/game-hud/LivesDisplay';

	export default {
		components: {
			GameHUDButton,
			LivesDisplay
		},
		props: {
			lives: Number,
			dummyImage: String,
			paused: {
				type: Boolean,
				default: false
			},
			sound: {
				type: Boolean,
				default: false
			},
			music: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			/**
			 * Show the pause button only if the event listener was provided
			 * @returns {Boolean}
			 */
			showPauseButton() {
				return !!this.$listeners.pause;
			}
		},
		methods: {
			/**
			 * Emits the "set-sound" or "set-music" events with the toggled preference value
			 * @param {String} preference
			 * @param {Boolean} value
			 */
			setSoundPreference(preference, value) {
				const action = `set-${preference}`;
				this.$emit(action, value);
			},
			/**
			 * Emits the pause event
			 */
			pause() {
				this.$emit('pause');
			}
		}
	};
</script>

<style scoped lang="scss">
	.game-hud {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		user-select: none;
		z-index: 1;

		.buttons-wrapper {
			position: absolute;
			display: flex;
			right: 0px;
			top: 0px;
			padding: 15px;
		}

		@media (max-width: $small) {
			.buttons-wrapper {
				.game-hud-button {
					width: 35px;
					height: 35px;

					svg {
						width: 13px;
						height: 16px;
					}
				}
			}
		}
	}
</style>
