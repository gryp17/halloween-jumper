<template>
	<FormButton
		class="menu-button"
		transparent
		v-on="{
			...$listeners
		}"
	>
		<slot></slot>
	</FormButton>
</template>

<style scoped lang="scss">
	.menu-button {
		display: block;
		width: 100%;

		&.form-button.transparent {
			display: block;
			width: 100%;
			max-width: 350px;
			margin: auto;
			padding: 10px;
			text-align: center;
			font-size: 24px;
			opacity: 1;
			color: $white;
			background-color: transparent;
			transition: all 500ms ease;
			border-radius: 3px;

			&:hover {
				background-color: rgba($white, 0.2);
			}
		}
	}
</style>
