import Vue from 'vue';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faVolumeUp, faMusic, faPause } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';

import App from './App.vue';
import router from './router';
import store from './store';

//add more icons if necessary
library.add(faVolumeUp, faMusic, faPause);

//enables the use of the <i> tag for the font awesome icons (<i class="fab fa-apple"></i>)
dom.watch();

/* how to use the font-awesome vue component:
	<font-awesome-icon :icon="['fas', 'coffee']" />
	<font-awesome-icon :icon="['far', 'angry']" />
	<font-awesome-icon :icon="['fab', 'apple']" />
*/

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
