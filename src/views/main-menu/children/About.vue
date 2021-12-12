<template>
	<div class="about">
		<MainMenuSection>
			<template #title>
				About
			</template>
			<template #content>
				content
			</template>
			<template #buttons>
				<FormButton @click="$router.push({ name: 'initial-screen' })">
					Back
				</FormButton>
			</template>
		</MainMenuSection>
	</div>
</template>

<script>
	import MainMenuSection from '@/components/MainMenuSection';

	export default {
		components: {
			MainMenuSection
		}
	};
</script>
