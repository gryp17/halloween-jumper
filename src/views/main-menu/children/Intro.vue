<template>
	<div class="intro">
		<FormButton
			class="play-btn"
			@click="onPlay"
		>
			Play
		</FormButton>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		methods: {
			...mapActions('audio', [
				'playMusic',
				'playTrack'
			]),
			/**
			 * Picks and plays a random intro track
			 * @returns {Promise}
			 */
			playIntro() {
				//pick a random intro track
				const track = _.sample(['ghost', 'tocata']);

				return this.playTrack({
					track,
					volume: 0.4
				});
			},
			/**
			 * Redirects to the initial screen of the main menu and starts playing the game music
			 */
			async onPlay() {
				this.$router.push({ name: 'initial-screen' });

				await this.playIntro();
				this.playMusic();
			}
		}
	};
</script>

<style scoped lang="scss">
	.intro {
		.play-btn {
			display: block;
			margin: 10px auto;
			font-size: 35px;
		}
	}
</style>
