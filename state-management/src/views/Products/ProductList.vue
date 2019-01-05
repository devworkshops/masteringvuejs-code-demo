<template>
    <div>
        <div class="border-bottom mb-3">
            <h1>Products</h1>
        </div>

        <b-table striped hover :items="products" :fields="fields">
            <template slot="actions" slot-scope="row">
                <router-link :to="{name:'product-edit',params:{id:row.item.id}}">Edit</router-link>
            </template>
        </b-table>
    </div>
</template>

<script>
import { ProductsService } from '@/services/NorthwindService.js'

export default {
    data() {
        return {
            fields: [
                { key: 'id', sortable: true },
                { key: 'name', sortable: true },
                { key: 'quantityPerUnit', sortable: true },
                { key: 'unitPrice', sortable: true },
                { key: 'unitsInStock', sortable: true },
                { key: 'discontinued', sortable: true },
                { key: 'actions' }
            ],
            products: []
        }
    },
    created() {
        ProductsService.getAll()
            .then(r => (this.products = r.data))
            .catch(err => console.error(err))
    }
}
</script>

<style>
</style>
