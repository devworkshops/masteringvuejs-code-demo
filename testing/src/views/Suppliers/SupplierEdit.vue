<template>
  <div>
    <h1>Supplier #{{id}}</h1>
    <form class="form">
      <div class="form-group row">
        <label class="col-form-label">Company Name</label>
        <input type="text" class="form-control" id="companyNameField" v-model="model.companyName">
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
      <button @click.prevent="save()" class="btn btn-primary" id="saveButton">Save</button>
      <button @click.prevent="navigateBack()" class="btn btn-default">Cancel</button>
    </p>
  </div>
</template>

<script>
import { SupplierService } from "@/services/NorthwindService.js";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      model: Object
    };
  },
  created() {
    SupplierService.getSupplier(this.id).then(r => (this.model = r.data));
  },
  methods: {
    save() {
      SupplierService.updateSupplier(this.model)
        .then(r => this.navigateBack())
        .catch(err => console.error(err));
    },
    navigateBack() {
      this.$router.push("/suppliers");
    }
  }
};
</script>

<style>
</style>
