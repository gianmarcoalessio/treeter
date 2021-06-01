<template>
  <i :class="input" class="mr-3"></i>
  <p>{{ title }}</p>
</template>

<script>
export default {
  props: {
    input: String,
    title: String,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>