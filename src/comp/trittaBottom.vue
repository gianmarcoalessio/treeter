<template>
  <div class="px-5 py-3 border-b-8 border-lighter flex">
    <div>
      <i
        class="fas fa-user w-12 h-12 pt-2 pl-3.5 text-2xl rounded-full border border-lighter"
      ></i>
    </div>
    <form v-on:submit.prevent="addNewTweet" class="w-full px-4 relative">
      <textarea
        v-model="tweet.content"
        placeholder="What's up?"
        class="mt-3 pb-3 w-full focus:outline-none"
      />
      <div class="flex items-center">
        <jgTrittaIcons :icons="icons" />
      </div>
      <button
        class="h-10 px-4 text-white font-semibold bg-green hover:bg-darkgreen focus:outline-none rounded-full absolute bottom-0 right-0"
      >
        Tweet
      </button>
    </form>
  </div>
</template>

<script>
import jgTrittaIcons from "@comp/trittaIcons.vue";
export default {
  components: {
    jgTrittaIcons,
  },
  data() {
    return {
      //logged: {},
      tweet: { content: "" },
      icons: [
        "far fa-image",
        "fas fa-film",
        "far fa-chart-bar",
        "far fa-smile",
      ],
    };
  },

  methods: {
    async addNewTweet() {
      var t = await this.$fetch("servizio/jgNewTreet", {
        content: this.tweet.content,
        author: this.logged.id,
        isComment: "",
        isRetreet: "",
      });
    },
  },
  created() {
    //console.log(this.treets);
    this.$globalon("logged", (id) => {
      this.logged.id = id;
    });
    this.$globalon("logout", () => {
      this.logged.id = "";
    });
  },
  beforeUnmount() {
    this.$globaloff("logged");
    this.$globaloff("logout");
  },
};
</script>

<style>
</style>