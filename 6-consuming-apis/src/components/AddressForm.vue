<template>
  <div>
    <div class="form-group row">
      <label for="street" class="col-form-label">Street</label>
      <input
        type="text"
        class="form-control"
        id="streetField"
        v-model="address.street"
        :class="{'is-invalid':errors['address.street']}"
      >
      <div class="invalid-feedback" v-if="errors['address.street']">{{errors['address.street']}}</div>
    </div>
    <div class="form-group row">
      <label for="city" class="col-form-label">City</label>
      <input
        type="text"
        class="form-control"
        id="cityField"
        v-model="address.city"
        :class="{'is-invalid':errors['address.city']}"
      >
      <div class="invalid-feedback" v-if="errors['address.city']">{{errors['address.city']}}</div>
    </div>
    <div class="form-group row">
      <label for="region" class="col-form-label">Region</label>
      <input
        type="text"
        class="form-control"
        id="regionField"
        v-model="address.region"
        :class="{'is-invalid':errors['address.region']}"
      >
      <div class="invalid-feedback" v-if="errors['address.region']">{{errors['address.region']}}</div>
    </div>
    <div class="form-group row">
      <label for="postalCode" class="col-form-label">PostalCode</label>
      <input
        type="text"
        class="form-control"
        id="postalCodeField"
        v-model="address.postalCode"
        :class="{'is-invalid':errors['address.postalCode']}"
      >
      <div class="invalid-feedback" v-if="errors['address.postalCode']">{{errors['address.postalCode']}}</div>
    </div>
    <div class="form-group row">
      <label for="country" class="col-form-label">Country</label>
      <input
        type="text"
        class="form-control"
        id="countryField"
        v-model="address.country"
        :class="{'is-invalid':errors['address.country']}"
      >
      <div class="invalid-feedback" v-if="errors['address.country']">{{errors['address.country']}}</div>
    </div>
    <div class="form-group row">
      <label for="phone" class="col-form-label">Phone</label>
      <input
        type="text"
        class="form-control"
        id="phoneField"
        v-model="address.phone"
        :class="{'is-invalid':errors['address.phone']}"
      >
      <div class="invalid-feedback" v-if="errors['address.phone']">{{errors['address.phone']}}</div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        address: {
            type: Object,
            required: true
        },
        errors: {
            type: Object,
            default: function() {
                return {}
            }
        }
    }
}
</script>

<style>
</style>
