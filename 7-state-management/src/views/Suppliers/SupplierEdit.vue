<template>
    <div>
        <div class="border-bottom mb-3">
            <h2>{{ this.id === 0 ? 'Add' : 'Edit' }} Supplier</h2>
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
            supplier: {
                id: 0,
                companyName: '',
                contactName: '',
                contactTitle: '',
                address: {
                    street: '',
                    city: '',
                    region: '',
                    postalCode: null,
                    country: '',
                    phone: ''
                }
            }
        }
    },
    created() {
        if (this.id !== 0) {
            SuppliersService.get(this.id).then(
                result => (this.supplier = result.data)
            )
        }
    },
    methods: {
        ...mapActions(['raiseSuccessNotification', 'raiseErrorNotification']),
        save() {
            if (this.id === 0) {
                SuppliersService.create(this.supplier)
                    .then(() => {
                        this.raiseSuccessNotification(
                            `The supplier '${
                                this.supplier.companyName
                            }' was successfully created.`
                        )
                        this.navigateBack()
                    })
                    .catch(() => {
                        this.raiseErrorNotification(
                            `A server error occurred attempting to create the supplier '${
                                this.supplier.companyName
                            }'.`
                        )
                    })
            } else {
                SuppliersService.update(this.supplier)
                    .then(() => {
                        this.raiseSuccessNotification(
                            `The supplier '${
                                this.supplier.companyName
                            }' was successfully updated.`
                        )
                        this.navigateBack()
                    })
                    .catch(() => {
                        this.raiseErrorNotification(
                            `A server error occurred attempting to updated the supplier '${
                                this.supplier.companyName
                            }'.`
                        )
                    })
            }
        },
        navigateBack() {
            this.$router.push('/suppliers')
        }
    }
}
</script>

<style>
</style>
