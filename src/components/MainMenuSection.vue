<template>
	<div class="main-menu-section">
		<div class="section-title">
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
