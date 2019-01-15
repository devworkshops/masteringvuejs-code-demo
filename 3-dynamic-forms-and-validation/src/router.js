import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'

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
            path: '/suppliers/:id',
            name: 'suppliers-edit',
            component: () => import('./views/Suppliers/SupplierEdit.vue'),
            props: true
        },
        {
            path: '/categories',
            name: 'categories',
            component: () => import('./views/Categories/CategoryList.vue')
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})
