<template>
  <div>
    <h1>You're on supplier #{{id}}</h1>
    <p>{{model}}</p>
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
    SupplierService.getSupplier(this.id).then(r => this.model = r.data);
  }
};
</script>

<style>
</style>
