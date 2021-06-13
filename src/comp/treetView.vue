<template>
  <div class="flex">
    <div class="flex-none mr-4">
      <!-- <img :src="`${follow.src}`" class="h-12 w-12 rounded-full flex-none"/> -->
      <i
        class="
          fas
          fa-user
          w-8
          h-8
          p-2
          rounded-full
          border border-lighter
          flex-none
        "
      >
      </i>
    </div>
    <div class="w-full">
      <div class="flex items-center w-full">
        <p class="font-semibold">{{ name }}</p>
        <p class="text-sm text-dark ml-2">{{ username }}</p>
        <p class="text-sm text-dark ml-2">{{ time }}</p>
        <i class="fas fa-angle-down text-dark ml-auto"></i>
      </div>
      <p class="py-2">
        {{ tweet }}
      </p>

      <div class="flex items-center w-1/2 justify-between">
        <div
          v-for="(bot, i) in bottom"
          :key="i"
          class="flex items-center text-sm text-dark"
        >
          <i class="mr-3" :class="bot.icon"></i>
          <p>{{ bot.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      bottom: [
        { icon: "far fa-comment", title: "2" },
        { icon: "fas fa-retweet", title: "33" },
        { icon: "fas fa-heart", title: "2341" },
        { icon: "fas fa-share-square", title: "" },
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