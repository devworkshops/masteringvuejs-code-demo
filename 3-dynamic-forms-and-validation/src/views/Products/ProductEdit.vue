<template>
    <div>
        <h1>{{ this.id === 0 ? 'Add' : 'Edit' }} Product</h1>

        <form @submit.prevent="save()">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="product.name">
            </div>
            <div class="form-group">
                <label>Category</label>
                <select class="form-control" v-model.number="product.categoryID">
                    <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                    >{{ category.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <label>Supplier</label>
                <select class="form-control" v-model.number="product.supplierID">
                    <option
                        v-for="supplier in suppliers"
                        :key="supplier.id"
                        :value="supplier.id"
                    >{{ supplier.companyName }}</option>
                </select>
            </div>
            <div class="form-group">
                <label>Quantity Per Unit</label>
                <input type="text" class="form-control" v-model="product.quantityPerUnit">
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label>Unit Price</label>
                    <input type="number" class="form-control" v-model="product.unitPrice">
                </div>
                <div class="form-group col-md-4">
                    <label>Units In Stock</label>
                    <input type="number" class="form-control" v-model="product.unitsInStock">
                </div>
                <div class="form-group col-md-4">
                    <label>Units On Order</label>
                    <input type="number" class="form-control" v-model="product.unitsOnOrder">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label>Reorder Level</label>
                    <input type="number" class="form-control" v-model="product.reorderLevel">
                </div>
                <div class="form-group col-md-4">
                    <label>Status</label>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="discontinuedCheckbox"
                            v-model="product.discontinued"
                        >
                        <label class="form-check-label" for="discontinuedCheckbox">Discontinued</label>
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Save</button>
            <button @click="navigateBack()" class="btn btn-default">Cancel</button>
        </form>
    </div>
</template>

<script>
import {
    CategoriesService,
    SuppliersService,
    ProductsService
} from '@/services/NorthwindService.js'

export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            categories: [],
            suppliers: [],
            product: {
                id: 0,
                supplierID: null,
                categoryID: null,
                quantityPerUnit: '',
                unitPrice: 0.0,
                unitsInStock: 0,
                unitsOnOrder: 0,
                reorderLevel: 0,
                discontinued: false,
                name: ''
            }
        }
    },
    created() {
        CategoriesService.getAll().then(
            result => (this.categories = result.data)
        )

        SuppliersService.getAll().then(result => (this.suppliers = result.data))

        if (this.id !== 0) {
            ProductsService.get(this.id).then(
                result => (this.product = result.data)
            )
        }
    },
    methods: {
        save() {
            if (this.id === 0) {
                ProductsService.create(this.product)
                    .then(() => this.navigateBack())
                    .catch(error => {
                        console.error(error)
                    })
            } else {
                ProductsService.update(this.product)
                    .then(() => this.navigateBack())
                    .catch(error => {
                        console.error(error)
                    })
            }
        },
        navigateBack() {
            this.$router.push('/products')
        }
    }
}
</script>

<style scoped>
</style>
