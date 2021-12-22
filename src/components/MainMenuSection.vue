<template>
	<div class="main-menu-section">
		<div
			v-if="hasTitle"
			class="section-title"
		>
			<slot name="title"></slot>
		</div>

		<div class="section-content">
			<slot name="content"></slot>
		</div>

		<div class="section-buttons">
			<slot name="buttons"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			/**
			 * Indicates whether the title slot was provided
			 * @returns {Boolean}
			 */
			hasTitle() {
				return !!this.$slots.title;
			}
		}
	};
</script>

<style scoped lang="scss">
	.main-menu-section {
		.section-title {
			padding: 20px;
			font-size: 24px;
			text-align: center;
		}

		.section-buttons {
			display: flex;
			padding: 10px;
			justify-content: center;

			.form-button + .form-button {
				margin-left: 15px;
			}
		}
	}
</style>
