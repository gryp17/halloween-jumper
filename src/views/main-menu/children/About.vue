<template>
	<div class="about">
		<MainMenuSection>
			<template #content>
				<div class="about-content">
					<div class="intro">
						Halloween Jumper is a halloween themed jump and run game inspired by the first game I ever created back in 2012 - Java Jumper.
					</div>

					<div class="credits">
						<div class="credit-item">
							<div class="role">
								Development and game design
							</div>
							<div class="name">
								Gryp
							</div>
						</div>

						<div class="credit-item">
							<div class="role">
								Character design
							</div>
							<div class="name">
								Bevouliin
							</div>
						</div>

						<div class="credit-item">
							<div class="role">
								8-bit music
							</div>
							<div class="name">
								Florio
							</div>
						</div>
					</div>
				</div>
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

<style scoped lang="scss">
	.about {
		.about-content {
			margin-top: 20px;

			.intro {
				margin: auto;
				max-width: 600px;
				font-size: 18px;
				text-align: center;
				font-weight: bold;
			}

			.credits {
				margin-top: 10px;
				text-align: center;

				.credit-item {
					margin: 20px 0px;

					.role {
						font-size: 24px;
						font-weight: bold;
						color: $orange;
					}

					.name {
						margin-top: 5px;
						font-size: 18px;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
