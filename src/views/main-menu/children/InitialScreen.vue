<template>
	<div class="initial-screen">
		<div @click="$router.push({ name: 'level-select' })">
			Play
		</div>
		<div @click="$router.push({ name: 'settings' })">
			Settings
		</div>
		<div @click="$router.push({ name: 'about' })">
			About
		</div>
	</div>
</template>

<style scoped lang="scss">
	.initial-screen {
		div {
			padding: 10px;
			text-align: center;
			font-size: 24px;
		}
	}
</style>
