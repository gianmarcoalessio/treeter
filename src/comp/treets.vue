<template>
  <h1>{{ logged.id }}</h1>
  <!-- myTreets -->
  <div
    v-for="(treet, i) in treets"
    :key="i"
    class="flex flex-col-reverse w-full p-4 border-b hover:bg-lighter"
  >
    <!-- <jgTreet
      :src="myUser.src"
      :name="myUser.name"
      :username="myUser.username"
      :time="myUser.time"
      :tweet="treet.content"
      :comments="myUser.comments"
      :retweets="myUser.retweets"
      :like="myUser.like"
    /> -->
    <pre>{{ treet }}</pre>
  </div>
  <button v-if="hasmore" @click="load(page)">more</button>
  <!-- following -->
  <div
    v-for="(follow, i) in following"
    :key="i"
    class="flex flex-col-reverse w-full p-4 border-b hover:bg-lighter"
  >
    <jgTreet
      :src="follow.src"
      :name="follow.name"
      :username="follow.username"
      :time="follow.time"
      :tweet="follow.tweet"
      :comments="follow.comments"
      :retweets="follow.retweets"
      :like="follow.like"
    />
  </div>
</template>

<script>
import { bus } from "@eng/bus";
import { post } from "@eng/post";
import jgTreet from "@comp/treet.vue";
export default {
  data() {
    return {
      logged: {},
      myUser: {
        src: "",
        name: "User",
        username: "@username",
        time: "1s",
        comments: "0",
        retweets: "0",
        like: "0",
      },
      following: [
        {
          src: "elon.jpg",
          name: "giammi",
          username: "@teslaBoy2",
          //time: "1.4 hr",
          tweet: "Grazie :)",
          comments: "100,500",
          retweets: "1,000,032",
          like: "5,000,103",
        },
      ],
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
      this.load(0);
    });
    bus.on("logout", () => {
      this.logged.id = "";
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