<template>
    <div>
        <div class="border-bottom mb-3">
            <h1>Suppliers</h1>
        </div>

        <b-table striped hover :items="suppliers" :fields="fields">
            <template slot="actions" slot-scope="row">
                <router-link :to="{name:'supplier-edit',params:{id:row.item.id}}">Edit</router-link>
            </template>
        </b-table>
    </div>
</template>

<script>
import { SuppliersService } from '@/services/NorthwindService.js'

export default {
    data() {
        return {
            fields: [
                { key: 'id', sortable: true },
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
        SuppliersService.getAll()
            .then(r => (this.suppliers = r.data))
            .catch(err => console.error(err))
    }
}
</script>

<style>
</style>
