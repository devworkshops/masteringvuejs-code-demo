import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import Unauthorized from './views/Unauthorized.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/suppliers',
            name: 'suppliers',
            component: () => import('./views/Suppliers/SupplierList.vue')
        },
        {
            path: '/suppliers/new',
            name: 'suppliers-new',
            component: () => import('./views/Suppliers/SupplierEdit.vue')
        },
        {
            path: '/suppliers/:id',
            name: 'suppliers-edit',
            component: () => import('./views/Suppliers/SupplierEdit.vue'),
            props: true
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/unauthorized',
            component: Unauthorized
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})
