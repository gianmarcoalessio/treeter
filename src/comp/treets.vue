<template>
  <h1>{{ logged.id }}</h1>
  <!-- myTreets -->
  <div
    v-for="(treet, i) in treets"
    :key="i"
    class="flex flex-col-reverse w-full p-4 border-b hover:bg-lighter"
  >
    <jgTreet
      :src="myUser.src"
      :name="myUser.name"
      :handle="myUser.handle"
      :time="myUser.time"
      :tweet="treet.content"
      :comments="myUser.comments"
      :retweets="myUser.retweets"
      :like="myUser.like"
    />
  </div>
  <!-- following -->
  <div
    v-for="(follow, i) in following"
    :key="i"
    class="flex flex-col-reverse w-full p-4 border-b hover:bg-lighter"
  >
    <jgTreet
      :src="follow.src"
      :name="follow.name"
      :handle="follow.handle"
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
import jgTreet from "@comp/treet.vue";
export default {
  data() {
    return {
      logged: {},
      myUser: {
        src: "",
        name: "User",
        handle: "@username",
        time: "1s",
        comments: "0",
        retweets: "0",
        like: "0",
      },
      following: [
        {
          src: "elon.jpg",
          name: "Agostino Alessio",
          handle: "@liburno",
          time: "20 min",
          tweet: "Ottimo lavoro ragazzi <3<3",
          comments: "1,000",
          retweets: "550",
          like: "1,000,003",
        },
        {
          src: "kevin.jpg",
          name: "Turing",
          handle: "@cipollino",
          time: "55 min",
          tweet: "Bau",
          comments: "2,030",
          retweets: "50",
          like: "20,003",
        },
        {
          src: "kevin.jpg",
          name: "Lanie Alessio Restauro",
          handle: "@lanievento",
          time: "57 min",
          tweet: "Volete qualcosa da mangiare",
          comments: "7,030",
          retweets: "40",
          like: "33,000",
        },
        {
          src: "elon.jpg",
          name: "dessa",
          handle: "@teslaBoy1",
          time: "1.4 hr",
          tweet: "Haha ",
          comments: "100,000",
          retweets: "1,000,002",
          like: "5,000,003",
        },
        {
          src: "elon.jpg",
          name: "giammi",
          handle: "@teslaBoy2",
          time: "1.4 hr",
          tweet: "Grazie :)",
          comments: "100,500",
          retweets: "1,000,032",
          like: "5,000,103",
        },
      ],
    };
  },
  props: {
    treets: Array,
  },
  components: {
    jgTreet,
  },
  created() {
    bus.on("logged", (id) => {
      this.logged.id = id;
      //console.log(id);
    });
  },
};
</script>

<style>
</style>