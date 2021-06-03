<template>
  <h1>{{ logged.id }}</h1>
  <!-- myTreets -->
  <div
    v-for="(treet, i) in treets"
    :key="i"
    class="flex flex-col-reverse w-full p-4 border-b hover:bg-lighter"
  >
    <jgTreet
      :src="treet.src"
      :name="treet.name"
      :username="treet.username"
      :time="String(treet.time)"
      :tweet="treet.tweet"
      :comments="String(treet.comments)"
      :retweets="String(treet.retweets)"
      :likes="String(treet.likes)"
    />
  </div>
  <button v-if="hasmore" @click="load(page)" class="ml-44">more</button>
</template>

<script>
import jgTreet from "@comp/treet.vue";
export default {
  data() {
    return {
      //logged: {},
      //treets: [],
      //page: 0,
      //hasmore: false,
    };
  },
  components: {
    jgTreet,
  },
  created() {
    this.$globalon("logged", (id) => {
      this.logged.id = id;
      this.treets = [];
      this.load(0);
    });
    this.$globalon("logout", () => {
      this.logged.id = "";
      this.treets = [];
    });
  },
  beforeUnmount() {
    this.globaloff("logged");
    this.globaloff("logout");
  },
};
</script>

<style>
</style>