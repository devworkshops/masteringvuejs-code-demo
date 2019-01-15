import axios from 'axios'

const apiClient = axios.create({
    baseURL: `//localhost:3000`,
    withCredentials: false, // This is the default
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export const SupplierService = {
    getSuppliers() {
        return apiClient.get('/suppliers')
    },
    getSupplier(id) {
        return apiClient.get('/suppliers/' + id)
    },
    updateSupplier(supplier) {
        return apiClient.put('/suppliers/' + supplier.id, supplier)
    },
    createSupplier(supplier) {
        return apiClient.post('/suppliers', supplier)
    }
}
