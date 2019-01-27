import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'nprogress/nprogress.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import axios from 'axios'

const requireComponent = require.context(
    './components',
    true,
    /[a-zA-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
    // Get component config
    const componentConfig = requireComponent(fileName)

    // Get PascalCase name of component
    const componentName = upperFirst(
        camelCase(
            // Strip the leading `./` and extension from the filename
            fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
        )
    )

    // Register component globally
    Vue.component(
        componentName,
        // Look for the component options on `.default`, which will
        // exist if the component was exported with `export default`,
        // otherwise fall back to module's root.
        componentConfig.default || componentConfig
    )
})

// Registering filters globally
const requireFilters = require.context(
    './filters',
    true,
    /[a-zA-Z]\w+\.(vue|js)$/
)
requireFilters.keys().forEach(fileName => {
    const componentConfig = requireFilters(fileName)
    const componentName = upperFirst(
        camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
    )
    Vue.filter(componentName, componentConfig.default)
})

axios.get('/static/config.json').then(response => {
    axios.defaults.baseURL = response.data.baseUrl

    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')
})

