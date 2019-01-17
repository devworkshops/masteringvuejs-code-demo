<template>
    <div>
        <div class="clearfix">
            <h1 class="float-left">Products</h1>
            <router-link
                tag="button"
                class="btn btn-primary float-right"
                :to="{ name: 'products-edit', params: { id: 0 } }"
            >Add</router-link>
        </div>

        <b-table striped hover :items="products" :fields="fields">
            <template slot="actions" slot-scope="row">
                <div class="btn-group" role="group">
                    <router-link
                        tag="button"
                        :to="{name:'products-edit', params: { id: row.item.id }}"
                        class="btn btn-secondary"
                    >Edit</router-link>
                    <button type="button" class="btn btn-danger" @click="remove(row.item.id)">Delete</button>
                </div>
            </template>
        </b-table>
    </div>
</template>

<script>
import { ProductsService } from '@/services/NorthwindService.js'

export default {
    data() {
        return {
            products: [],
            fields: [
                { key: 'id', sortable: true },
                { key: 'name', sortable: true },
                { key: 'unitPrice', sortable: true, label: 'Price' },
                { key: 'unitsInStock', sortable: true, label: 'Stock' },
                { key: 'actions' }
            ]
        }
    },
    created() {
        this.fetchAll()
    },
    methods: {
        fetchAll() {
            ProductsService.getAll()
                .then(result => (this.products = result.data))
                .catch(error => console.error(error))
        },
        remove(id) {
            ProductsService.delete(id)
                .then(
                    () =>
                        (this.products = this.products.filter(p => p.id !== id))
                )
                .catch(error => console.error(error))
        }
    }
}
</script>

<style scoped>
</style>
