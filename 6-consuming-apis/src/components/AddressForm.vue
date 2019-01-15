<template>
  <div>
    <div class="form-group row">
      <label for="street" class="col-form-label">Street</label>
      <input type="text" class="form-control" id="streetField" v-model="address.street">
    </div>
    <div class="form-group row">
      <label for="city" class="col-form-label">City</label>
      <input type="text" class="form-control" id="cityField" v-model="address.city">
    </div>
    <div class="form-group row">
      <label for="region" class="col-form-label">Region</label>
      <input type="text" class="form-control" id="regionField" v-model="address.region">
    </div>
    <div class="form-group row">
      <label for="postalCode" class="col-form-label">PostalCode</label>
      <input type="text" class="form-control" id="postalCodeField" v-model="address.postalCode">
    </div>
    <div class="form-group row">
      <label for="country" class="col-form-label">Country</label>
      <input type="text" class="form-control" id="countryField" v-model="address.country">
    </div>
    <div class="form-group row">
      <label for="phone" class="col-form-label">Phone</label>
      <input type="text" class="form-control" id="phoneField" v-model="address.phone">
    </div>
  </div>
</template>

<script>
export default {
    props: {
        address: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>
</style>
