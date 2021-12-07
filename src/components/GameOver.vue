<template>
	<div class="game-over">
		<div class="inner-wrapper">
			<img class="game-over-image" src="@/assets/img/game-over.png" />
			<div @click="$emit('new-game')">
				New game
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.game-over {
		position: absolute;
		display: flex;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;

		.inner-wrapper {
			padding: 20px;
			margin: auto;
			max-width: 700px;
			background-color: $transparent-background;
			border-radius: 3px;
			z-index: 1;

			.game-over-image {
				display: block;
				margin: auto;
				width: 100%;
			}

			div {
				padding: 10px;
				text-align: center;
				font-size: 24px;
			}
		}
	}
</style>
