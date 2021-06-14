<template>
  <h1>{{ logged.id }}</h1>
  <!-- myTreets -->
  <div
    v-for="(treet, i) in treets"
    :key="i"
    class="flex flex-col-reverse w-full p-4 border-b hover:bg-lighter"
  >
    <!-- <pre>{{ treet }}</pre> -->
    <jgTreet
      :id="treet.tid"
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
  <!-- <button v-if="hasmore" @click="load(page)" class="ml-44">more</button> -->
</template>

<script>
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
    // async load() {
    //   var t = await this.$fetch("servizio/jGetPage", { page:this.page });
    //   if (this.page == 0) {
    //     this.data = t.data;
    //   } else {
    //     for (var tm of t.data) { this.data.push(tm) };
    //   }
    //   this.hasmore = t.hasmore;
    //   this.page++;
    // },
    async load() {
      var t = await this.$fetch("servizio/jgFeedMore", {
        logged: this.logged.id,
        page: this.page,
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
    this.$globalon("logged", (id) => {
      this.logged.id = id;
      this.treets = [];
      this.load(0);
    });
    this.$globalon("logout", () => {
      this.logged.id = "";
      this.treets = [];
    });
    this.load(0);
    this.$globalon("more", this.load);
  },
  beforeUnmount() {
    this.$globaloff("logged");
    this.$globaloff("logout");
    this.$globaloff("more");
  },
};
</script>

<style>
</style>