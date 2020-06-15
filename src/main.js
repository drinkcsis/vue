//VUE
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Viewer from "v-viewer";

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Viewer);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')