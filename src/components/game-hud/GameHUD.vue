<template>
	<div class="game-hud">

		<LivesDisplay
			v-if="lives && dummyImage"
			:lives="lives"
			:dummy-image="dummyImage"
		/>

		<div class="audio-controls-wrapper">
			<FormButton
				transparent
				:active="sound"
				@click="setSoundPreference('sound', !sound)"
			>
				<i class="fas fa-volume-up"></i>
			</FormButton>

			<FormButton
				transparent
				:active="music"
				@click="setSoundPreference('music', !music)"
			>
				<i class="fas fa-music"></i>
			</FormButton>
		</div>
	</div>
</template>

<script>
	import LivesDisplay from '@/components/game-hud/LivesDisplay';

	export default {
		props: {
			lives: Number,
			dummyImage: String,
			sound: {
				type: Boolean,
				default: false
			},
			music: {
				type: Boolean,
				default: false
			}
		},
		components: {
			LivesDisplay
		},
		methods: {
			/**
			 * Emits the "set-sound" or "set-music" events with the toggled preference value
			 * @param {String} preference
			 * @param {Boolean} value
			 */
			setSoundPreference(preference, value) {
				//give focus back to the canvas after clicking any of the buttons
				$('.canvas').focus();

				const action = `set-${preference}`;
				this.$emit(action, value);
			}
		}
	};
</script>

<style scoped lang="scss">
	.game-hud {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		user-select: none;
		z-index: 1;

		.audio-controls-wrapper {
			position: absolute;
			right: 0px;
			top: 0px;
			padding: 15px;

			.form-button {
				width: 43px;
				height: 43px;
				padding: 0px;
				border-radius: 100%;
				border: solid 2px lighten($purple, 10%);
				background-color: $white;
				opacity: 0.6;

				svg {
					width: 100%;
					margin-right: 0px;
				}

				+ .form-button {
					margin-left: 10px;
				}

				&.active, &:hover {
					border-color: $purple;
					opacity: 1;
				}
			}
		}

		@media (max-width: $small) {
			.audio-controls-wrapper {
				.form-button {
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
