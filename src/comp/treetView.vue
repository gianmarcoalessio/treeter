<template>
  <div class="flex container h-screen w-full">
    <!-- side nav -->
    <div
      class="
        w-1/6
        lg:w-1/5
        border-lighter
        px-2
        lg:px-6
        py-2
        flex flex-col
        justify-between
      "
    >
      <div class="sm:ml-12">
        <jgNavTop :tabs="tabs" :isHomePage="false" />
      </div>
    </div>
    <!-- Treets -->

    <d-scrollmanager class="w-2/3 border">
      <div class="px-5 py-3 border-b border-lighter flex items-center">
        <i class="text-xl fas fa-arrow-left text-darkgreen"></i>
        <h1 class="text-xl ml-3 font-bold">Treet</h1>
      </div>
      <div class="p-3">
        <jgTreet
          :id="id"
          :src="src"
          :name="name"
          :username="username"
          :time="String(time)"
          :tweet="tweet"
          :comments="String(comments)"
          :retweets="String(retweets)"
          :likes="String(likes)"
        />
      </div>
    </d-scrollmanager>
  </div>
</template>

<script>
import jgNavTop from "@comp/navTop.vue";
import jgTreet from "@comp/treet.vue";
export default {
  components: {
    jgNavTop,
    jgTreet,
  },
  data() {
    return {
      id: this.$route.params.id,
      src: "",
      name: "Alfonso",
      username: "alf98",
      time: "2 sec",
      tweet: "ciao",
      comments: "2",
      retweets: "33",
      likes: "2341",

      tabs: [
        { icon: "fas fa-search", title: "Search", id: "search" },
        { icon: "fas fa-cog font-medium", title: "Settings", id: "settings" },
      ],
    };
  },
  methods: {
    gotomain() {
      this.$router.push("/treet/" + this.id);
      // this.$router.push("/treet/", { id: this.id }); DOMANDA
    },
  },
};
</script>

<style>
</style>