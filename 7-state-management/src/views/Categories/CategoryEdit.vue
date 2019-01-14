<template>
    <div>
        <div class="border-bottom mb-3">
            <h2>{{ this.id === 0 ? 'Add' : 'Edit' }} Category</h2>
        </div>

        <form class="form">
            <div class="form-group row">
                <label class="col-form-label">Name</label>
                <input type="text" class="form-control" v-model="category.name">
            </div>
            <div class="form-group row">
                <label class="col-form-label">Description</label>
                <input type="text" class="form-control" v-model="category.description">
            </div>
        </form>
        <p>
            <button @click.prevent="save()" class="btn btn-primary">Save</button>
            <button @click.prevent="navigateBack()" class="btn btn-default">Cancel</button>
        </p>
    </div>
</template>

<script>
import { CategoriesService } from '@/services/NorthwindService.js'
import { mapActions } from 'vuex'

export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            category: {
                id: 0,
                name: '',
                description: ''
            }
        }
    },
    created() {
        if (this.id !== 0) {
            CategoriesService.get(this.id).then(
                result => (this.category = result.data)
            )
        }
    },
    methods: {
        ...mapActions(['raiseSuccessNotification', 'raiseErrorNotification']),
        save() {
            if (this.id === 0) {
                CategoriesService.create(this.category)
                    .then(() => {
                        this.raiseSuccessNotification(
                            `The category '${
                                this.category.name
                            }' was successfully created.`
                        )
                        this.navigateBack()
                    })
                    .catch(() => {
                        this.raiseErrorNotification(
                            `A server error occurred attempting to create the category '${
                                this.category.name
                            }'.`
                        )
                    })
            } else {
                CategoriesService.update(this.category)
                    .then(() => {
                        this.raiseSuccessNotification(
                            `The category '${
                                this.category.name
                            }' was successfully updated.`
                        )
                        this.navigateBack()
                    })
                    .catch(() => {
                        this.raiseErrorNotification(
                            `A server error occurred attempting to update the category '${
                                this.category.name
                            }'.`
                        )
                    })
            }
        },
        navigateBack() {
            this.$router.push('/categories')
        }
    }
}
</script>

<style>
</style>
