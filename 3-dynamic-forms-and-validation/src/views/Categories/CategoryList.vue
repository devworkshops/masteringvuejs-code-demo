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
                    >
                </td>
                <td>
                    <input
                        type="text"
                        v-model="addingCategory.description"
                        placeholder="Description..."
                        class="form-control"
                    >
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
            CategoriesService.add(this.addingCategory)
                .then(result => {
                    this.categories.push(result.data)
                    this.resetAdd()
                })
                .catch(error => console.error(error))
        },
        resetAdd() {
            this.addingCategory = { ...this.defaultCategory }
        }
    }
}
</script>

<style scoped>
</style>
