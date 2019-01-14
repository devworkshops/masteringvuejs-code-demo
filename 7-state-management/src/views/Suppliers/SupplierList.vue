<template>
    <div>
        <div class="clearfix">
            <h2 class="float-left">Suppliers</h2>
            <b-btn
                class="float-right"
                variant="primary"
                :to="{ name: 'supplier-edit', params: { id: 0 } }"
            >
                <plus-icon></plus-icon>Add
            </b-btn>
        </div>

        <b-table striped hover :items="suppliers" :fields="fields">
            <template slot="actions" slot-scope="row">
                <b-button-toolbar class="float-right">
                    <b-button-group>
                        <b-btn :to="{ name: 'supplier-edit', params: { id:row.item.id } }">
                            <edit2-icon></edit2-icon>
                        </b-btn>
                        <b-btn
                            variant="danger"
                            @click="supplierToDelete = row.item"
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
            title="Delete Supplier?"
            centered
            ok-title="Delete"
            ok-variant="danger"
            @ok="deleteConfirmed"
        >
            <p class="my-4">Are you sure you want to delete '{{ supplierToDelete.companyName }}'?</p>
        </b-modal>
    </div>
</template>

<script>
import { SuppliersService } from '@/services/NorthwindService.js'
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
                { key: 'companyName', sortable: true },
                { key: 'contactName', sortable: true },
                { key: 'contactTitle', sortable: true },
                { key: 'address.city' },
                { key: 'actions' }
            ],
            suppliers: [],
            supplierToDelete: {}
        }
    },
    methods: {
        ...mapActions(['raiseSuccessNotification', 'raiseErrorNotification']),
        deleteConfirmed() {
            if (this.supplierToDelete) {
                SuppliersService.delete(this.supplierToDelete.id)
                    .then(() => {
                        this.suppliers = this.suppliers.filter(
                            p => p.id !== this.supplierToDelete.id
                        )

                        this.raiseSuccessNotification(
                            `The supplier '${
                                this.supplierToDelete.companyName
                            }' was successfully deleted.`
                        )
                    })
                    .catch(() => {
                        this.raiseErrorNotification(
                            `A server error occurred attempting to delete the supplier '${
                                this.supplierToDelete.companyName
                            }'.`
                        )
                    })
            }
        }
    },
    created() {
        SuppliersService.getAll()
            .then(r => (this.suppliers = r.data))
            .catch(() => {
                this.raiseErrorNotification(
                    'A server error occurred attempting to get all suppliers.'
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
