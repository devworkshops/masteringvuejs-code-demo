<template>
    <div>
        <h1>Suppliers</h1>
        <table class="table" v-if="suppliers.length > 0">
            <tr>
                <th>Company Name</th>
                <th>Contact Name</th>
                <th>Contact Title</th>
                <th>Address City</th>
                <th>Actions</th>
            </tr>
            <tr v-for="supplier in suppliers" :key="supplier.id">
                <td>{{ supplier.companyName }}</td>
                <td>{{ supplier.contactName }}</td>
                <td>{{ supplier.contactTitle }}</td>
                <td>{{ supplier.address.city }}</td>
                <td>
                    <router-link
                        tag="button"
                        :to="{name:'suppliers-edit',params:{id:supplier.id}}"
                        class="btn btn-primary"
                    >Edit</router-link>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { SuppliersService } from '@/services/NorthwindService.js'
export default {
    data() {
        return {
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

<style scoped>
</style>
