import axios from 'axios'
import NProgress from 'nprogress'
import router from '@/router'
// import config from '@/assets/config.json'

const apiClient = axios.create({
    //baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(config => {
    if (axios.defaults.baseURL) {
        if (AuthService.token()) {
            config.headers.authorization = 'Bearer ' + AuthService.token()
        }
        NProgress.start()
    }
    return config
})

apiClient.interceptors.response.use(
    config => {
        NProgress.done()
        return config
    },
    err => {
        NProgress.done()
        if (err.response.status == 401) router.push('/unauthorized')
        throw err
    }
)

export const SupplierService = {
    getAll() {
        return apiClient.get('/suppliers')
    },
    get(id) {
        return apiClient.get('/suppliers/' + id)
    },
    update(supplier) {
        return apiClient.put('/suppliers/' + supplier.id, supplier)
    },
    create(supplier) {
        return apiClient.post('/suppliers/', supplier)
    },
    delete(id) {
        return apiClient.delete('/suppliers/' + id)
    }
}

export const AuthService = {
    currentUser: undefined,
    currentToken: undefined,
    isLoggedIn() {
        return !!this.currentToken
    },
    login(email, password) {
        return apiClient
            .post('/auth/login', { email, password })
            .then(response => {
                this.currentToken = response.data.access_token
                localStorage.setItem('token', this.currentToken)
                this.user()
                return response
            })
    },
    logout() {
        this.currentToken = null
        this.currentUser = null
        localStorage.removeItem('token')
    },
    token() {
        if (!this.currentToken) {
            this.currentToken = localStorage.getItem('token')
            if (this.currentToken) {
                this.user()
            }
        }
        return this.currentToken
    },
    user() {
        return apiClient.get('/user').then(response => {
            this.currentUser = response.data
        })
    }
}
