<template>
    <div>
        <h1>{{ this.id === 0 ? 'Add' : 'Edit' }} Product</h1>

        <form @submit.prevent="save()">
            <div class="form-group">
                <label>Name</label>
                <input
                    type="text"
                    class="form-control"
                    v-model.trim.lazy="$v.product.name.$model"
                    :class="{ 'is-invalid': $v.product.name.$error }"
                >
                <div
                    class="invalid-feedback"
                    v-if="!$v.product.name.required"
                >Name is a required field.</div>
                <div
                    class="invalid-feedback"
                    v-if="!$v.product.name.minLength"
                >Name must be at least 4 characters.</div>
                <div
                    class="invalid-feedback"
                    v-if="!$v.product.name.maxLength"
                >Name can be at most 40 characters.</div>
                <div
                    class="invalid-feedback"
                    v-if="!$v.product.name.isUnique"
                >This product name already exists.</div>
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
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="$v.product.unitPrice.$model"
                        :class="{ 'is-invalid': $v.product.unitPrice.$error }"
                    >
                    <div
                        class="invalid-feedback"
                        v-if="!$v.product.unitPrice.decimal"
                    >Unit price is of type decimal.</div>
                    <div
                        class="invalid-feedback"
                        v-if="!$v.product.unitPrice.minValue"
                    >Unit price must be greater than zero.</div>
                </div>
                <div class="form-group col-md-4">
                    <label>Units In Stock</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="$v.product.unitsInStock.$model"
                        :class="{ 'is-invalid': $v.product.unitsInStock.$error }"
                    >
                    <div
                        class="invalid-feedback"
                        v-if="!$v.product.unitsInStock.integer"
                    >Units in stock is of type integer.</div>
                    <div
                        class="invalid-feedback"
                        v-if="!$v.product.unitsInStock.minValue"
                    >Units in stock can not be less than zero.</div>
                </div>
                <div class="form-group col-md-4">
                    <label>Units On Order</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="$v.product.unitsOnOrder.$model"
                        :class="{ 'is-invalid': $v.product.unitsOnOrder.$error }"
                    >
                    <div
                        class="invalid-feedback"
                        v-if="!$v.product.unitsOnOrder.integer"
                    >Units on order is of type integer.</div>
                    <div
                        class="invalid-feedback"
                        v-if="!$v.product.unitsOnOrder.minValue"
                    >Units on order can not be less than zero.</div>
                    <div
                        class="invalid-feedback"
                        v-if="!$v.product.unitsOnOrder.reorderNotRequired"
                    >Stock has run out! Units on order must be greater than zero.</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label>Reorder Level</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="$v.product.reorderLevel.$model"
                        :class="{ 'is-invalid': $v.product.reorderLevel.$error }"
                    >
                    <div
                        class="invalid-feedback"
                        v-if="!$v.product.reorderLevel.integer"
                    >Reorder level is of type integer.</div>
                    <div
                        class="invalid-feedback"
                        v-if="!$v.product.reorderLevel.minValue"
                    >Reorder level can not be less than zero.</div>
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

import {
    required,
    minLength,
    maxLength,
    decimal,
    integer,
    minValue
} from 'vuelidate/lib/validators'

const reorderNotRequired = (value, vm) =>
    vm.discontinued || vm.unitsInStock > 0 || vm.unitsOnOrder > 0

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
    validations: {
        product: {
            name: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(40),
                isUnique(value) {
                    if (value === '') return true

                    return ProductsService.isUniqueProductName(value)
                }
            },
            unitPrice: {
                decimal,
                minValue: minValue(0.01)
            },
            unitsInStock: {
                integer,
                minValue: minValue(0)
            },
            unitsOnOrder: {
                integer,
                minValue: minValue(0),
                reorderNotRequired
            },
            reorderLevel: {
                integer,
                minValue: minValue(0)
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
            this.$v.$touch()

            if (this.$v.$invalid) return

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
