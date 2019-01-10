<template>
  <div>
    <h1>{{ counter }}</h1>
    <button @click="increment()">+</button>
    <button @click="decrement()">-</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            counter: 0
        }
    },
    methods: {
        increment() {
            this.counter++
        },
        decrement() {
            this.counter--
        }
    }
}
</script>

<style>
</style>
