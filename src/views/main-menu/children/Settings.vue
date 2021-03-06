<template>
	<div class="settings">
		<MainMenuSection>
			<template #title>
				Settings
			</template>
			<template #content>
				<div class="settings-content">
					<Tabs
						ref="tabs"
						cache-lifetime="0"
						:options="{ useUrlFragment: false }"
					>
						<Tab
							name="Keyboard controls"
						>
							<table class="controls-table">
								<thead>
									<tr>
										<td>Input</td>
										<td>Primary</td>
										<td>Secondary</td>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(data, inputType) in inputs" :key="inputType">
										<td>
											{{ inputType }}
										</td>
										<td v-for="(keyCode, index) in data.keys" :key="index">
											<ControlInput
												v-model="data.keys[index]"
												:valid-input-key-codes="validInputKeyCodes"
												@input="onInput($event, inputType, index)"
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</Tab>
						<Tab
							name="Sound"
						>
							<FormSwitch v-model="audio.sound">
								Sound effects
							</FormSwitch>

							<FormSwitch v-model="audio.music">
								Background music
							</FormSwitch>

							<div class="volume-settings">
								<div class="volume-label">
									Sound effects volume
								</div>

								<vue-slider
									v-model="audio.soundVolume"
									v-bind="sliderOptions"
								/>

								<div class="volume-label">
									Background music volume
								</div>

								<vue-slider
									v-model="audio.musicVolume"
									v-bind="sliderOptions"
								/>
							</div>
						</Tab>
					</Tabs>
				</div>
			</template>
			<template #buttons>
				<FormButton
					neutral
					@click="$router.push({ name: 'initial-screen' })"
				>
					Back
				</FormButton>

				<FormButton
					danger
					@click="reset"
				>
					Reset
				</FormButton>

				<FormButton
					@click="submit"
				>
					Save
				</FormButton>
			</template>
		</MainMenuSection>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import { Tabs, Tab } from 'vue-tabs-component';
	import VueSlider from 'vue-slider-component';

	import MainMenuSection from '@/components/MainMenuSection';
	import ControlInput from '@/components/ControlInput';

	import config from '@/game/config';

	export default {
		components: {
			Tabs,
			Tab,
			VueSlider,
			MainMenuSection,
			ControlInput
		},
		data() {
			return {
				inputs: {},
				audio: {
					sound: true,
					music: true,
					musicVolume: 50,
					soundVolume: 50
				},
				sliderOptions: {
					dragOnClick: false,
					height: 12,
					dotSize: 20,
					tooltip: 'none'
				}
			};
		},
		computed: {
			...mapState('settings', [
				'controls',
				'sound',
				'music',
				'soundVolume',
				'musicVolume'
			]),
			/**
			 * Contains the valid input key codes
			 * @returns {Object}
			 */
			validInputKeyCodes() {
				return config.validInputKeyCodes;
			}
		},
		/**
		 * Populates the form with the data from the vuex store
		 */
		created() {
			this.inputs = _.cloneDeep(this.controls);
			this.audio.sound = this.sound;
			this.audio.music = this.music;
			this.audio.soundVolume = this.soundVolume * 100;
			this.audio.musicVolume = this.musicVolume * 100;
		},
		methods: {
			...mapActions('settings', [
				'updateSettings'
			]),
			/**
			 * Called when the control input value changes
			 * @param {Number} keyCode
			 * @param {String} inputType
			 * @param {Number} index
			 */
			onInput(keyCode, inputType, index) {
				if (!keyCode) {
					return;
				}

				//check if this keyCode was used for another input and clear it
				_.forOwn(this.inputs, (data, type) => {
					data.keys.forEach((key, keyIndex) => {
						if (inputType === type && keyIndex === index) {
							return;
						}

						//clear the input value
						if (key === keyCode) {
							this.inputs[type].keys[keyIndex] = null;
						}
					});
				});
			},
			/**
			 * Saves the settings
			 */
			submit() {
				//convert the volume values from 0..100 integers to float
				const audioSettings = {
					...this.audio,
					soundVolume: this.audio.soundVolume / 100,
					musicVolume: this.audio.musicVolume / 100
				};

				this.updateSettings({
					controls: this.inputs,
					...audioSettings
				});

				this.$router.push({ name: 'initial-screen' });
			},
			/**
			 * Resets the settings to their default values
			 */
			reset() {
				const currentTab = this.$refs.tabs.lastActiveTabHash;

				if (currentTab === '#keyboard-controls') {
					this.inputs = _.cloneDeep(config.defaultControls);
				}

				if (currentTab === '#sound') {
					this.audio.sound = config.defaultAudioSettings.sound.enabled;
					this.audio.music = config.defaultAudioSettings.music.enabled;
					this.audio.soundVolume = config.defaultAudioSettings.sound.volume * 100;
					this.audio.musicVolume = config.defaultAudioSettings.music.volume * 100;
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.settings {
		.settings-content {
			.tabs-component-panels {
				padding: 10px;
			}

			.controls-table {
				margin-bottom: 5px;
				width: 100%;

				thead {
					td {
						padding-bottom: 10px;
						text-align: center;
						font-weight: bold;
					}
				}

				tbody {
					td {
						padding-bottom: 5px;

						&:first-child {
							padding-left: 10px;
							padding-right: 10px;
							text-align: center;
							text-transform: uppercase;
						}
					}
				}
			}

			.volume-settings {
				margin-top: 25px;

				.volume-label {
					margin-top: 5px;
				}
			}
		}
	}
</style>
