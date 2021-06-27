<template>
  <div class="flex" @click="gotomain()">
    <div class="flex-none mr-4">
      <!-- <img :src="`${follow.src}`" class="h-12 w-12 rounded-full flex-none"/> -->
      <i
        class="
          text-base
          fas
          fa-user
          w-8
          h-8
          pt-1
          pl-2
          rounded-full
          border border-lighter
          flex-none
        "
      >
      </i>
    </div>
    <div class="w-full">
      <div class="flex items-center w-full">
        <p class="font-semibold">{{ treet.name }}</p>
        <p class="text-sm text-dark ml-2">{{ treet.username }}</p>
        <p class="text-sm text-dark ml-2">{{ treet.time }}</p>
        <i class="fas fa-angle-down text-dark ml-auto"></i>
      </div>
      <p class="py-2">
        {{ treet.tweet }}
      </p>

      <div class="flex items-center w-full justify-between">
        <div
          v-for="(bot, i) in bottom"
          :key="i"
          class="flex items-center text-sm text-dark"
        >
          <jgTreetIcon :input="bot.icon" :title="bot.title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jgTreetIcon from "@comp/TreetIcon.vue";
export default {
  components: {
    jgTreetIcon,
  },
  props: {
    id: String,
    treet: { type: Object, default: {} },

    // id: String,
    // src: String,
    // name: String,
    // username: String,
    // time: String,
    // tweet: String,
    // comments: { type: [String, Number], default: "" },
    // retweets: String,
    // likes: String,
  },
  methods: {
    gotomain() {
      this.$router.push("/treet/" + this.id);
      console.log(this.retweets);
      // this.$router.push("/treet/", { id: this.id }); DOMANDA
    },
  },
  computed: {
    bottom() {
      return [
        { icon: "far fa-comment", title: this.treet.comments },
        { icon: "fas fa-retweet", title: this.treet.retweets },
        { icon: "fas fa-heart", title: this.treet.likes },
        { icon: "fas fa-share-square", title: "" },
      ];
    },
  },
};
</script>

<style>
</style>