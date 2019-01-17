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
                    <button
                        type="button"
                        class="btn btn-danger"
                        @click="deleteRequested(row.item)"
                    >Delete</button>
                </div>
            </template>
        </b-table>
        <b-pagination :total-rows="productCount" :per-page="10" v-model="page" @input="fetchAll()"/>
        <b-modal
            id="deleteModal"
            ref="deleteModal"
            title="Delete Product?"
            centered
            ok-title="Delete"
            ok-variant="danger"
            @ok="deleteConfirmed"
        >
            <p class="my-4">Are you sure you want to delete '{{ productToDelete.name }}'?</p>
        </b-modal>
    </div>
</template>

<script>
import { ProductsService } from '@/services/NorthwindService.js'

export default {
    data() {
        return {
            products: [],
            productCount: 0,
            page: 1,
            fields: [
                { key: 'id', sortable: true },
                { key: 'name', sortable: true },
                { key: 'unitPrice', sortable: true, label: 'Price' },
                { key: 'unitsInStock', sortable: true, label: 'Stock' },
                { key: 'actions' }
            ],
            productToDelete: {}
        }
    },
    created() {
        this.fetchAll()
    },
    methods: {
        fetchAll() {
            ProductsService.getAllPaged(this.page)
                .then(result => {
                    this.productCount = parseInt(
                        result.headers['x-total-count']
                    )
                    this.products = result.data
                })
                .catch(error => console.error(error))
        },
        deleteRequested(product) {
            this.productToDelete = product
            this.$refs.deleteModal.show()
        },
        deleteConfirmed() {
            ProductsService.delete(this.productToDelete.id)
                .then(() => {
                    this.products = this.products.filter(
                        p => p.id !== this.productToDelete.id
                    )
                })
                .catch(error => console.error(error))
        }
    }
}
</script>

<style scoped>
</style>
