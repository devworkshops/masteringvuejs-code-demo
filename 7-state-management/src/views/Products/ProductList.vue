<template>
    <div>
        <div class="clearfix">
            <h2 class="float-left">Products</h2>
            <b-btn
                class="float-right"
                variant="primary"
                :to="{ name: 'product-edit', params: { id: 0 } }"
            >
                <plus-icon></plus-icon>Add
            </b-btn>
        </div>

        <b-table striped hover :items="products" :fields="fields">
            <template slot="actions" slot-scope="row">
                <b-button-toolbar class="float-right">
                    <b-button-group>
                        <b-btn :to="{ name: 'product-edit', params: { id:row.item.id } }">
                            <edit2-icon></edit2-icon>
                        </b-btn>
                        <b-btn
                            variant="danger"
                            @click="productToDelete = row.item"
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
            title="Delete Product?"
            centered
            ok-title="Delete"
            ok-variant="danger"
            @ok="deleteConfirmed"
        >
            <p class="my-4">Are you sure you want to delete '{{ productToDelete.name }}'?</p>
        </b-modal>
    </div>
</template>

<script>
import { ProductsService } from '@/services/NorthwindService.js'
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
                { key: 'quantityPerUnit', sortable: true },
                { key: 'unitPrice', sortable: true },
                { key: 'unitsInStock', sortable: true },
                { key: 'discontinued', sortable: true },
                { key: 'actions' }
            ],
            products: [],
            productToDelete: {}
        }
    },
    methods: {
        ...mapActions(['raiseSuccessNotification', 'raiseErrorNotification']),
        deleteConfirmed() {
            if (this.productToDelete) {
                ProductsService.delete(this.productToDelete.id)
                    .then(() => {
                        this.raiseSuccessNotification(
                            `The product '${
                                this.productToDelete.name
                            }' was successfully deleted.`
                        )
                        this.products = this.products.filter(
                            p => p.id !== this.productToDelete.id
                        )
                    })
                    .catch(() => {
                        this.raiseErrorNotification(
                            `A server error occurred attempting to delete the product '${
                                this.productToDelete.name
                            }'.`
                        )
                    })
            }
        }
    },
    created() {
        ProductsService.getAll()
            .then(r => (this.products = r.data))
            .catch(() => {
                this.raiseErrorNotification(
                    'A server error occurred attempting to get all products.'
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
