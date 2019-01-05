<template>
    <div>
        <div class="border-bottom mb-3">
            <h1>Categories</h1>
        </div>

        <b-table striped hover :items="categories" :fields="fields">
            <template slot="actions" slot-scope="row">
                <router-link :to="{name:'category-edit',params:{id:row.item.id}}">Edit</router-link>
            </template>
        </b-table>
    </div>
</template>

<script>
import { CategoriesService } from '@/services/NorthwindService.js'

export default {
    data() {
        return {
            fields: [
                { key: 'id', sortable: true },
                { key: 'description', sortable: true },
                { key: 'name', sortable: true },
                { key: 'actions' }
            ],
            categories: ['Test']
        }
    },
    created() {
        CategoriesService.getAll()
            .then(r => (this.categories = r.data))
            .catch(err => console.error(err))
    }
}
</script>

<style>
</style>
