import Vue from 'vue'
import App from './app.vue'

// import MsUi from  './index.js'
import './styles/base.scss';
// Vue.use(MsUi);

new Vue({
    render: h => h(App)
}).$mount("#app")