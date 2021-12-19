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
	import MainMenuSection from '@/components/MainMenuSection';
	import ControlInput from '@/components/ControlInput';

	import config from '@/game/config';

	export default {
		components: {
			Tabs,
			Tab,
			MainMenuSection,
			ControlInput
		},
		data() {
			return {
				inputs: {},
				audio: {
					sound: true,
					music: true
				}
			};
		},
		computed: {
			...mapState('settings', [
				'controls',
				'sound',
				'music'
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
				this.updateSettings({
					controls: this.inputs,
					...this.audio
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
					this.audio.sound = true;
					this.audio.music = true;
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
		}
	}
</style>
