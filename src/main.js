//VUE
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Viewer from "v-viewer";
//TODO Fix this
(async () => {
    try {
        const promise = await import("./utils/webkitRequestFileSystem");
        await promise.default;
    } catch (e) {
        console.error('Sorry your browser doesn`t support "webkitRequestFileSystem"');
        throw new Error('Sorry your browser doesn`t support "webkitRequestFileSystem"');
    }

    Vue.config.productionTip = false
    Vue.config.devtools = true

    Vue.use(Viewer);

    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')
})();