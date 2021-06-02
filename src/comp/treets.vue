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
import { bus } from "@eng/bus";
import { post } from "@eng/post";
import jgTreet from "@comp/treet.vue";
export default {
  data() {
    return {
      logged: {},
      treets: [],
      page: 0,
      hasmore: false,
    };
  },
  components: {
    jgTreet,
  },
  methods: {
    async load(page) {
      var t = await post.post("servizio/jgFeedMore", {
        logged: this.logged.id,
        page,
      });
      if (this.page == 0) {
        this.treets = t.treets;
      } else {
        for (var tm of t.treets) {
          this.treets.push(tm);
        }
      }
      console.log(this.treets.length);
      this.hasmore = t.hasmore;
      this.page++;
    },
  },
  created() {
    bus.on("logged", (id) => {
      this.logged.id = id;
      this.treets = [];
      this.load(0);
    });
    bus.on("logout", () => {
      this.logged.id = "";
      this.treets = [];
    });
  },
  beforeUnmount() {
    bus.off("logged");
    bus.off("logout");
  },
};
</script>

<style>
</style>