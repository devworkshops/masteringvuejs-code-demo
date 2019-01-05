<template>
    <div>
        <div class="border-bottom mb-3">
            <h1>Supplier #{{id}}</h1>
        </div>

        <form class="form">
            <div class="form-group row">
                <label class="col-form-label">Company Name</label>
                <input type="text" class="form-control" v-model="supplier.companyName">
            </div>
            <div class="form-group row">
                <label class="col-form-label">Contact Name</label>
                <input type="text" class="form-control" v-model="supplier.contactName">
            </div>
            <div class="form-group row">
                <label class="col-form-label">Contact Title</label>
                <input type="text" class="form-control" v-model="supplier.contactTitle">
            </div>
            <div class="form-group">
                <label class="col-form-label">Address</label>
                <address-form :address="supplier.address"></address-form>
            </div>
        </form>
        <p>
            <button @click.prevent="save()" class="btn btn-primary">Save</button>
            <button @click.prevent="navigateBack()" class="btn btn-default">Cancel</button>
        </p>
    </div>
</template>

<script>
import { SuppliersService } from '@/services/NorthwindService.js'

export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            supplier: Object
        }
    },
    created() {
        SuppliersService.get(this.id).then(
            result => (this.supplier = result.data)
        )
    },
    methods: {
        save() {
            SuppliersService.update(this.supplier)
                .then(() => this.navigateBack())
                .catch(err => console.error(err))
        },
        navigateBack() {
            this.$router.push('/suppliers')
        }
    }
}
</script>

<style>
</style>
