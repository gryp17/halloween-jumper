<template>
	<div class="lives-display">
		<img
			v-for="index in lives"
			class="dummy-image"
			:key="index"
			:src="dummyImage"
		/>
	</div>
</template>

<script>
	export default {
		props: {
			lives: Number,
			dummyImage: String
		}
	};
</script>

<style scoped lang="scss">
	.lives-display {
		padding: 15px;

		.dummy-image {
			display: inline-block;
			margin-right: 6px;
			width: 24px;

			//chrome blurry downscaled images hackfix
			image-rendering: -webkit-optimize-contrast;
		}

		@media (max-width: $small) {
			.dummy-image {
				width: 20px;
			}
		}
	}
</style>
