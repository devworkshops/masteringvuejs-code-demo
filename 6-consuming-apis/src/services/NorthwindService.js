import axios from 'axios'
import NProgress from 'nprogress'
import router from '@/router'

const apiClient = axios.create({
    baseURL: `//localhost:3000`,
    // withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(config => {
    if (AuthService.token()) {
        config.headers.authorization = 'Bearer ' + AuthService.token()
    }
    NProgress.start()
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
        return this.currentUser != undefined
    },
    login(username, password) {
        return apiClient
            .post('/auth/login', { username, password })
            .then(response => {
                this.currentToken = response.data.access_token
                localStorage.setItem('token', this.currentToken)
                return response
            })
    },
    logout() {
        this.currentToken = undefined
        localStorage.setItem('token', undefined)
    },
    token() {
        if (!this.currentToken)
            this.currentToken = localStorage.getItem('token')
        return this.currentToken
    },
    user() {
        return apiClient.get('/user').then()
    }
}
