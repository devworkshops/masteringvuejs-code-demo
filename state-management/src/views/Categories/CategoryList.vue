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
                        <b-btn
                            variant="danger"
                            @click="categoryToDelete = row.item"
                            v-b-modal.deleteModal
                        >
                            <x-icon></x-icon>
                        </b-btn>
                    </b-button-group>
                </b-button-toolbar>
            </template>
        </b-table>

        <b-modal
            id="deleteModal"
            title="Delete Category?"
            centered
            ok-title="Delete"
            ok-variant="danger"
            @ok="deleteConfirmed"
        >
            <p class="my-4">Are you sure you want to delete '{{ categoryToDelete.name }}'?</p>
        </b-modal>
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
            categories: [],
            categoryToDelete: {}
        }
    },
    methods: {
        deleteConfirmed() {
            if (this.categoryToDelete) {
                CategoriesService.delete(this.categoryToDelete.id)
                    .then(
                        () =>
                            (this.categories = this.categories.filter(
                                c => c.id !== this.categoryToDelete.id
                            ))
                    )
                    .catch(err => console.error(err))
            }
        }
    },
    created() {
        CategoriesService.getAll()
            .then(result => (this.categories = result.data))
            .catch(err => console.error(err))
    }
}
</script>

<style>
.btn-group > .btn {
    padding-top: 1px;
}
</style>
