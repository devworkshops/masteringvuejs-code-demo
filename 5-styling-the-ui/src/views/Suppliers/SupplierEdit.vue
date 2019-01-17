<template>
    <div>
        <h1>Supplier #{{id}}</h1>
        <form class="form">
            <div class="form-group row">
                <label class="col-form-label">Company Name</label>
                <input type="text" class="form-control" v-model="model.companyName">
            </div>
            <div class="form-group row">
                <label class="col-form-label">Contact Name</label>
                <input type="text" class="form-control" v-model="model.contactName">
            </div>
            <div class="form-group row">
                <label class="col-form-label">Contact Title</label>
                <input type="text" class="form-control" v-model="model.contactTitle">
            </div>
            <div class="form-group" v-if="model.address">
                <label class="col-form-label">Address</label>
                <address-form :address="model.address"></address-form>
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
            model: Object
        }
    },
    created() {
        SuppliersService.get(this.id).then(r => (this.model = r.data))
    },
    methods: {
        save() {
            SuppliersService.update(this.model)
                .then(() => this.navigateBack())
                .catch(err => console.error(err))
        },
        navigateBack() {
            this.$router.push('/suppliers')
        }
    }
}
</script>

<style scoped>
</style>
