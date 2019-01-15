<template>
    <div>
        <div class="border-bottom mb-3">
            <h2>{{ this.id === 0 ? 'Add' : 'Edit' }} Product</h2>
        </div>

        <form class="form">
            <div class="form-group row">
                <label class="col-form-label">Name</label>
                <input type="text" class="form-control" v-model="product.name">
            </div>
            <div class="form-group row">
                <label class="col-form-label">Category</label>
                <select class="form-control" v-model.number="product.categoryID">
                    <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                    >{{ category.name }}</option>
                </select>
            </div>
            <div class="form-group row">
                <label class="col-form-label">Supplier</label>
                <select class="form-control" v-model.number="product.supplierID">
                    <option
                        v-for="supplier in suppliers"
                        :key="supplier.id"
                        :value="supplier.id"
                    >{{ supplier.companyName }}</option>
                </select>
            </div>
            <div class="form-group row">
                <label class="col-form-label">Quantity Per Unit</label>
                <input type="text" class="form-control" v-model="product.quantityPerUnit">
            </div>
            <div class="form-group row">
                <label class="col-form-label">Unit Price</label>
                <input type="number" class="form-control" v-model="product.unitPrice">
            </div>
            <div class="form-group row">
                <label class="col-form-label">Units In Stock</label>
                <input type="number" class="form-control" v-model="product.unitsInStock">
            </div>
            <div class="form-group row">
                <label class="col-form-label">Units On Order</label>
                <input type="number" class="form-control" v-model="product.unitsOnOrder">
            </div>
            <div class="form-group row">
                <label class="col-form-label">Reorder Level</label>
                <input type="number" class="form-control" v-model="product.reorderLevel">
            </div>
            <div class="form-group row">
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
        </form>
        <p>
            <button @click.prevent="save()" class="btn btn-primary">Save</button>
            <button @click.prevent="navigateBack()" class="btn btn-default">Cancel</button>
        </p>
    </div>
</template>

<script>
import {
    CategoriesService,
    SuppliersService,
    ProductsService
} from '@/services/NorthwindService.js'
import { mapActions } from 'vuex'

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
        ...mapActions(['raiseSuccessNotification', 'raiseErrorNotification']),
        save() {
            if (this.id === 0) {
                ProductsService.create(this.product)
                    .then(() => {
                        this.raiseSuccessNotification(
                            `The product '${
                                this.product.name
                            }' was successfully created.`
                        )
                        this.navigateBack()
                    })
                    .catch(() => {
                        this.raiseErrorNotification(
                            `A server error occurred attempting to create the product '${
                                this.product.name
                            }'.`
                        )
                    })
            } else {
                ProductsService.update(this.product)
                    .then(() => {
                        this.raiseSuccessNotification(
                            `The product '${
                                this.product.name
                            }' was successfully updated.`
                        )
                        this.navigateBack()
                    })
                    .catch(() => {
                        this.raiseErrorNotification(
                            `A server error occurred attempting to update the product '${
                                this.product.name
                            }'.`
                        )
                    })
            }
        },
        navigateBack() {
            this.$router.push('/products')
        }
    }
}
</script>

<style>
</style>
