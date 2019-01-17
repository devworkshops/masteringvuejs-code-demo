<template>
    <div>
        <h1>Categories</h1>
        <table class="table">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            <template v-for="(category, index) in categories">
                <tr :key="category.id" v-if="category.id === editingCategory.id">
                    <td>{{ category.id }}</td>
                    <td>
                        <input type="text" v-model="editingCategory.name" class="form-control">
                    </td>
                    <td>
                        <input
                            type="text"
                            v-model="editingCategory.description"
                            class="form-control"
                        >
                    </td>
                    <td>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-secondary" @click="update()">Update</button>
                            <button
                                type="button"
                                class="btn btn-warning"
                                @click="cancelUpdate()"
                            >Cancel</button>
                        </div>
                    </td>
                </tr>
                <tr :key="category.id" v-else>
                    <td>{{ category.id }}</td>
                    <td>{{ category.name }}</td>
                    <td>{{ category.description }}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                @click="edit(category, index)"
                            >Edit</button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                @click="remove(category.id)"
                            >Delete</button>
                        </div>
                    </td>
                </tr>
            </template>
            <tr>
                <td>New</td>
                <td>
                    <input
                        type="text"
                        v-model="addingCategory.name"
                        placeholder="Name..."
                        class="form-control"
                        :class="{ 'is-invalid': errors && errors.name }"
                    >
                    <div class="invalid-feedback" v-if="errors && errors.name">{{ errors.name }}</div>
                </td>
                <td>
                    <input
                        type="text"
                        v-model="addingCategory.description"
                        placeholder="Description..."
                        class="form-control"
                        :class="{ 'is-invalid': errors && errors.description }"
                    >
                    <div
                        class="invalid-feedback"
                        v-if="errors && errors.description"
                    >{{ errors.description }}</div>
                </td>
                <td>
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-secondary" @click="add()">Add</button>
                        <button type="button" class="btn btn-warning" @click="resetAdd()">Cancel</button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { CategoriesService } from '@/services/NorthwindService.js'

export default {
    data() {
        return {
            errors: null,
            categories: [],
            editingCategory: {},
            editingIndex: null,
            addingCategory: {
                name: '',
                description: ''
            },
            defaultCategory: {
                name: '',
                description: ''
            }
        }
    },
    created() {
        this.fetchAll()
    },
    methods: {
        validate(category) {
            this.errors = {}

            if (!category.name || !category.name.trim()) {
                this.errors.name = 'Name is a required field'
            }
            if (!category.description || !category.description.trim()) {
                this.errors.description = 'Description is a required field'
            }

            // If no errors added, set errors to null
            if (Object.keys(this.errors).length === 0) {
                this.errors = null
            }
        },
        fetchAll() {
            CategoriesService.getAll()
                .then(result => (this.categories = result.data))
                .catch(error => console.error(error))
        },
        edit(category, index) {
            this.editingCategory = { ...category }
            this.editingIndex = index
        },
        update() {
            CategoriesService.update(this.editingCategory)
                .then(() => {
                    this.categories[this.editingIndex] = this.editingCategory
                    this.editingCategory = {}
                })
                .catch(error => console.error(error))
        },
        cancelUpdate() {
            this.editingCategory = {}
        },
        remove(id) {
            CategoriesService.delete(id)
                .then(() => this.fetchAll())
                .catch(error => console.error(error))
        },
        add() {
            this.validate(this.addingCategory)
            if (this.errors) {
                return
            }

            CategoriesService.add(this.addingCategory)
                .then(result => {
                    this.categories.push(result.data)
                    this.resetAdd()
                })
                .catch(error => console.error(error))
        },
        resetAdd() {
            this.errors = null
            this.addingCategory = { ...this.defaultCategory }
        }
    }
}
</script>

<style scoped>
</style>
