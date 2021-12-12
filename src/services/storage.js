import config from '@/game/config';

const settingsKey = config.storage.settingsKey;

export default {
	/**
	 * Saves the settings in the local storage
	 * @param {Object} settings
	 */
	setSettings(settings) {
		localStorage.setItem(settingsKey, JSON.stringify(settings));
	},
	/**
	 * Fetches the settings from the local storage
	 * @returns {Object}
	 */
	getSettings() {
		const data = localStorage.getItem(settingsKey);

		if (data) {
			try {
				return JSON.parse(data);
			} catch (e) {
				return null;
			}
		}

		return null;
	}
};
