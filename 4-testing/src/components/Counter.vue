<template>
  <div>
    <button
      @click="increment()"
      @contextmenu.prevent="decrement()"
      :class="{'positive':counter>0,'negative':counter<0}"
    >{{counter}}</button>
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

<style scoped>
.positive {
    background-color: blue;
}
.negative {
    background-color: red;
}
</style>
