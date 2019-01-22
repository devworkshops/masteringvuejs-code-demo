<template>
  <div>
    <h1>{{id?`Supplier #${id}`:'New Supplier'}}</h1>
    <form class="form">
      <div class="form-group row">
        <label class="col-form-label">Company Name</label>
        <input type="text" class="form-control" id="companyNameField" v-model="model.companyName" :class="{ 'is-invalid': errors && errors.companyName }">
        <div class="invalid-feedback" v-if="errors && errors.companyName">{{ errors.companyName }}</div>
      </div>
      <div class="form-group row">
        <label class="col-form-label">Contact Name</label>
        <input type="text" class="form-control" id="contactNameField" v-model="model.contactName">
      </div>
      <div class="form-group row">
        <label class="col-form-label">Contact Title</label>
        <input type="text" class="form-control" id="contactTitleField" v-model="model.contactTitle">
      </div>
      <div class="form-group" v-if="model.address">
        <label class="col-form-label">Address</label>
        <address-form :address="model.address" :errors="errors"></address-form>
      </div>
    </form>
    <p>
      <button
        @click.prevent="save()"
        class="btn btn-primary"
        id="saveButton"
        :disabled="!valid"
      >Save</button>
      <button @click.prevent="navigateBack()" class="btn btn-default">Cancel</button>
    </p>
  </div>
</template>

<script>
import { SupplierService } from '@/services/NorthwindService.js'

export default {
    props: {
        id: {
            type: String
        }
    },
    data() {
        return {
            model: Object,
            errors: Object
        }
    },
    created() {
        if (this.id) {
            SupplierService.get(this.id).then(r => (this.model = r.data))
        } else {
            this.model = { address: {} }
        }
    },
    methods: {
        save() {
            if (this.id) {
                SupplierService.update(this.model)
                    .then(() => this.navigateBack())
                    .catch(err => {
                        if (err.response.status == 422) {
                            this.errors = err.response.data.errors
                        }
                    })
            } else {
                SupplierService.create(this.model)
                    .then(res => this.navigateBack())
                    .catch(err => {
                        if (err.response.status == 422) {
                            this.errors = err.response.data.errors
                        }
                    })
            }
        },
        navigateBack() {
            this.$router.push('/suppliers')
        }
    },
    computed: {
        valid() {
            if (
                !!this.model.companyName &&
                !!this.model.contactName &&
                !!this.model.contactTitle
            )
                return true
            return false
        }
    }
}
</script>

<style>
</style>
