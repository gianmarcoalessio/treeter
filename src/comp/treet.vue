<template>
  <div class="flex">
    <div class="flex-none mr-4">
      <!-- <img :src="`${follow.src}`" class="h-12 w-12 rounded-full flex-none"/> -->
      <i
        class="fas fa-user w-8 h-8 p-2 rounded-full border border-lighter flex-none"
      >
      </i>
    </div>
    <div class="w-full">
      <div class="flex items-center w-full">
        <p class="font-semibold">{{ name }}</p>
        <p class="text-sm text-dark ml-2">{{ handle }}</p>
        <p class="text-sm text-dark ml-2">{{ time }}</p>
        <i class="fas fa-angle-down text-dark ml-auto"></i>
      </div>
      <p class="py-2">
        {{ tweet }}
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
  data() {
    return {
      bottom: [
        { icon: "far fa-comment", title: this.comments},
        { icon: "fas fa-retweet", title: this.retweets },
        { icon: "fas fa-heart", title: this.like},
        { icon: "fas fa-share-square", title: ""},
      ],
    };
  },
  props: {
    src: String,
    name: String,
    handle: String,
    time: String,
    tweet: String,
    comments: String,
    retweets: String,
    like: String,
  },
};
</script>

<style>
</style>