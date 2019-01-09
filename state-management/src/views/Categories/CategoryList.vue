<template>
    <div>
        <div class="clearfix">
            <h2 class="float-left">Categories</h2>
            <b-btn
                class="float-right"
                variant="primary"
                :to="{ name: 'category-edit', params: { id: 0 } }"
            >
                <plus-icon></plus-icon>Add
            </b-btn>
        </div>

        <b-table striped hover :items="categories" :fields="fields">
            <template slot="actions" slot-scope="row">
                <b-button-toolbar class="float-right">
                    <b-button-group>
                        <b-btn :to="{ name: 'category-edit', params: { id:row.item.id } }">
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
import { mapActions } from 'vuex'

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
        ...mapActions(['raiseSuccessNotification', 'raiseErrorNotification']),
        deleteConfirmed() {
            if (this.categoryToDelete) {
                CategoriesService.delete(this.categoryToDelete.id)
                    .then(() => {
                        this.categories = this.categories.filter(
                            c => c.id !== this.categoryToDelete.id
                        )
                        this.raiseSuccessNotification(
                            `The category '${
                                this.categoryToDelete.name
                            }' was successfully deleted.`
                        )
                    })
                    .catch(() => {
                        this.raiseErrorNotification(
                            `A server error occurred attempting to delete the category '${
                                this.categoryToDelete.name
                            }'.`
                        )
                    })
            }
        }
    },
    created() {
        CategoriesService.getAll()
            .then(result => (this.categories = result.data))
            .catch(() => {
                this.raiseErrorNotification(
                    'A server error occurred attempting to get all categories.'
                )
            })
    }
}
</script>

<style>
.btn-group > .btn {
    padding-top: 1px;
}
</style>
