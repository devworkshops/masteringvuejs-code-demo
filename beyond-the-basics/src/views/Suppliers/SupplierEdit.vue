<template>
<div>
    <h1>You're on supplier #{{id}}</h1>
</div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
</style>
