<template>
  <div>
    <h1>Suppliers</h1>
    <router-link class="btn btn-primary" to="/suppliers/new">+</router-link>
    <b-table striped hover :items="suppliers" :fields="fields">
      <template slot="actions" slot-scope="row">
        <router-link :to="{name:'suppliers-edit',params:{id:row.item.id}}" class="suppliers-edit">Edit</router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import { SupplierService } from '@/services/NorthwindService.js'
export default {
    data() {
        return {
            fields: [
                { key: 'companyName', sortable: true },
                { key: 'contactName', sortable: true },
                { key: 'contactTitle', sortable: true },
                { key: 'address.city' },
                { key: 'actions' }
            ],
            suppliers: []
        }
    },
    created() {
        SupplierService.getAll()
            .then(r => (this.suppliers = r.data))
            .catch(err => console.error(err))
    }
}
</script>

<style>
</style>
