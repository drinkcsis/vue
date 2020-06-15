import Vue from 'vue'
import VueRouter from 'vue-router'
import Alboms from '../views/Alboms.vue'
import Albom from '../views/Albom.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Alboms',
        component: Alboms
    },
    {
        path: '/albom/:id',
        name: 'Albom',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
        component: Albom
    },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router