<template>
	<div class="initial-screen">
		<MenuButton
			title="Play"
			@click="$router.push({ name: 'level-select' })"
		>
			Play
		</MenuButton>
		<MenuButton
			title="Settings"
			@click="$router.push({ name: 'settings' })"
		>
			Settings
		</MenuButton>
		<MenuButton
			title="About"
			@click="$router.push({ name: 'about' })"
		>
			About
		</MenuButton>
	</div>
</template>

<script>
	import MenuButton from '@/components/MenuButton';

	export default {
		components: {
			MenuButton
		}
	};
</script>
