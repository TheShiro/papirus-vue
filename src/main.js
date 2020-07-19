import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min';
import marked from 'marked/marked.min'

Vue.config.productionTip = false
Vue.filter('marked', marked)

new Vue({
	router,
	store,
	data: {
		api: 'http://localhost:8000/api/',
		storage : 'http://localhost:8000/storage/'
	},
	render: h => h(App)
}).$mount('#app')
