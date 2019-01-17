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

        <table class="table">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
            </tr>
            <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.unitPrice }}</td>
                <td>{{ product.unitsInStock }}</td>
                <td>
                    <div class="btn-group" role="group">
                        <router-link
                            tag="button"
                            :to="{name:'products-edit',params:{id:product.id}}"
                            class="btn btn-secondary"
                        >Edit</router-link>
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click="remove(product.id)"
                        >Delete</button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { ProductsService } from '@/services/NorthwindService.js'

export default {
    data() {
        return { products: [] }
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
