<template>
  <div
    class="px-5 py-3 border-b border-lighter flex items-center justify-between"
  >
    <h1 class="text-xl font-bold">Home</h1>
    <i class="fas fa-tree text-2xl font-medium text-darkgreen"></i>
  </div>
  <div class="px-5 py-3 border-b-8 border-lighter flex">
    <div class="flex-none">  <!-- NOTA: a cosa serve il flex-none -->
      <i class="fas fa-user flex-none w-12 h-12 pt-2 pl-3.5 text-2xl rounded-full border border-lighter"></i>
    </div>
    <form v-on:submit.prevent="addNewTweet" class="w-full px-4 relative">
      <textarea
        v-model="tweet.content"
        placeholder="What's up?"
        class="mt-3 pb-3 w-full focus:outline-none"
      />
      <div class="flex items-center">
        <jgTrittaBottom :icons="icons" />
        <!--<i class="text-lg text-blue mr-4 far fa-image"></i>
        <i class="text-lg text-blue mr-4 fas fa-film"></i>
        <i class="text-lg text-blue mr-4 far fa-chart-bar"></i>
        <i class="text-lg text-blue mr-4 far fa-smile"></i>-->
      </div>
      <button
        type="submit"
        class="h-10 px-4 text-white font-semibold bg-green hover:bg-darkgreen focus:outline-none rounded-full absolute bottom-0 right-0"
      >
        Tweet
      </button>
    </form>
  </div>
</template>

<script>
import jgTrittaBottom from "@comp/trittaBottom.vue"
export default {
    components:{
        jgTrittaBottom,
    },
  data() {
    return {
      tweets: [{ content: "It is so nice outside!" }],
      tweet: { content: "" },
      icons: ["far fa-image","fas fa-film","far fa-chart-bar","far fa-smile"]
    };
  },
  methods:{
      addNewTweet () {
      let newTweet = {
        content: this.tweet.content
      };
      this.tweets.push (newTweet)
    }
  }
};
</script>

<style>
</style>