<template>
  <div
    class="px-5 py-3 border-b border-lighter flex items-center justify-between"
  >
    <h1 class="text-xl font-bold">Home</h1>
    <i class="fas fa-tree text-2xl font-medium text-darkgreen"></i>
  </div>

  <jgTrittaBottom @treets="tritta($event)"  />
</template>

<script>
import jgTrittaBottom from "@comp/trittaBottom.vue"
export default {
    components:{
        jgTrittaBottom,
    },
    methods: {
        tritta(x){
          this.$emit("treets",x);
        }
    },
};
</script>

<style>
</style>