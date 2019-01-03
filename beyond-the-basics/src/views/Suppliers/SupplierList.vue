<template>
  <div>
    <h1>Suppliers</h1>
    <b-table striped hover :items="suppliers" :fields="fields">
      <template slot="actions" slot-scope="row">
        <router-link :to="{name:'supplier-edit',params:{id:row.item.id}}">Details</router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fields: [
        { key: "companyName", sortable: true },
        { key: "contactName", sortable: true },
        { key: "contactTitle", sortable: true },
        { key: "address.city" },
        { key: "actions" }
      ],
      suppliers: []
    };
  },
  created() {
    axios
      .get("//localhost:3000/suppliers")
      .then(r => this.suppliers = r.data)
      .catch(err => console.error(err));
  }
};
</script>

<style>
</style>
