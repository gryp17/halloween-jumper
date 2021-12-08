import Vue from 'vue';
import VueRouter from 'vue-router';
import MainMenu from '@/views/main-menu/MainMenu';
import InitialScreen from '@/views/main-menu/children/InitialScreen';
import Settings from '@/views/main-menu/children/Settings';
import About from '@/views/main-menu/children/About';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: MainMenu,
		children: [
			{
				path: '/',
				name: 'initial-screen',
				component: InitialScreen
			},
			{
				path: 'settings',
				name: 'settings',
				component: Settings
			},
			{
				path: 'about',
				name: 'about',
				component: About
			}
		]
	},
	{
		path: '/game',
		name: 'game',
		component: () => import(/* webpackChunkName: "game" */ '@/views/Game.vue')
	},
	{
		path: '*',
		redirect: '/'
	}
];

const router = new VueRouter({
	mode: 'abstract',
	base: process.env.BASE_URL,
	routes
});

//this is needed for the router abstract mode to work
router.replace('/');

export default router;
