<template>
    <div>
        <div class="d-flex justify-content-between mb-3">
            <h2>Categories</h2>
            <div class="btn-toolbar">
                <button type="button" class="btn btn-primary">
                    <plus-icon></plus-icon>Add Category
                </button>
            </div>
        </div>

        <b-table striped hover :items="categories" :fields="fields">
            <template slot="actions" slot-scope="row">
                <b-button-toolbar>
                    <b-button-group class="mx-1">
                        <b-btn :to="{name:'category-edit',params:{id:row.item.id}}">
                            <edit2-icon></edit2-icon>
                        </b-btn>
                        <b-btn variant="danger">
                            <x-icon></x-icon>
                        </b-btn>
                    </b-button-group>
                </b-button-toolbar>
            </template>
        </b-table>
    </div>
</template>

<script>
import { CategoriesService } from '@/services/NorthwindService.js'
import { PlusIcon, Edit2Icon, XIcon } from 'vue-feather-icons'

export default {
    components: {
        PlusIcon,
        Edit2Icon,
        XIcon
    },
    data() {
        return {
            fields: [
                { key: 'id', sortable: true },
                { key: 'name', sortable: true },
                { key: 'description', sortable: true },
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
.btn-group > .btn {
    padding-top: 1px;
}
</style>
