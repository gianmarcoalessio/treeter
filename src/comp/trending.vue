<template>
  <input
    class="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4"
    placeholder="Search Twitter"
  />
  <i
    class="fas fa-search absolute left-0 top-0 mt-5 ml-12 text-sm text-light"
  ></i>
  <div class="w-full rounded-lg bg-lightest">
    <div class="flex items-center justify-between p-3">
      <p class="text-lg font-bold">Trends for You</p>
      <i class="fas fa-cog text-lg text-darkgreen"></i>
    </div>
    <button
      v-for="(trend, k) in trending"
      :key="k"
      class="w-full flex justify-between hover:bg-lighter p-3 border-t border-lighter"
    >
      <div>
        <p class="text-xs text-left leading-tight text-dark">{{ trend.top }}</p>
        <p class="font-semibold text-sm text-left leading-tight">
          {{ trend.title }}
        </p>
        <p class="text-left text-sm leading-tight text-dark">
          {{ trend.bottom }}
        </p>
      </div>
      <i class="fas fa-angle-down text-lg text-dark"></i>
    </button>
    <button
      class="p-3 w-full hover:bg-lighter text-left text-darkgreen border-t border-lighter"
    >
      Show More
    </button>
  </div>
  <div class="w-full rounded-lg bg-lightest my-4">
    <div class="p-3">
      <p class="text-lg font-bold">Who to Follow</p>
    </div>
    <button
      v-for="(friend, k) in friends"
      :key="k"
      class="w-full flex hover:bg-lighter p-3 border-t border-lighter"
    >
      <i
        class="hidden lg:block fas fa-user w-12 h-12 p-3 pt-2 text-2xl rounded-full border border-lighter"
      ></i>
      <div class="text-left lg:text-center lg:ml-4">
        <p class="text-sm font-bold leading-tight">{{ friend.name }}</p>
        <p class="text-sm leading-tight">{{ friend.username }}</p>
      </div>
      <button
        class="ml-auto text-sm text-darkgreen py-1 px-4 rounded-full border-2 border-darkgreen"
      >
        Follow
      </button>
    </button>
    <button
      class="p-3 w-full hover:bg-lighter text-left text-darkgreen border-t border-lighter"
    >
      Show More
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trending: [
        {
          top: "Trending in TX",
          title: "Gigi",
          bottom: "Trending with: Rip Gigi",
        },
        { top: "Music", title: "We Won", bottom: "135K Tweets" },
        { top: "Pop", title: "darkgreen Ivy", bottom: "40k tweets" },
        { top: "Trending in US", title: "Denim Day", bottom: "40k tweets" },
        { top: "Trending", title: "When Beyonce", bottom: "25.4k tweets" },
      ],
      friends: [
        { src: "elon.jpg", name: "Elon Musk", username: "@teslaBoy" },
        { src: "monk.jpg", name: "Adrian Monk", username: "@detective" },
        { src: "kevin.jpg", name: "Kevin Hart", username: "@miniRock" },
      ],
      following: [
        {
          src: "elon.jpg",
          name: "Elon Musk",
          username: "@teslaBoy",
          time: "20 min",
          tweet: "Should I just quarantine on mars??",
          comments: "1,000",
          retweets: "550",
          like: "1,000,003",
        },
        {
          src: "kevin.jpg",
          name: "Kevin Hart",
          username: "@miniRock",
          time: "55 min",
          tweet: "Should me and the rock do another sub-par movie together????",
          comments: "2,030",
          retweets: "50",
          like: "20,003",
        },
        {
          src: "elon.jpg",
          name: "Elon Musk",
          username: "@teslaBoy",
          time: "1.4 hr",
          tweet: "Haha just made a flame thrower. Shld I sell them?",
          comments: "100,000",
          retweets: "1,000,002",
          like: "5,000,003",
        },
        {
          src: "elon.jpg",
          name: "Elon Musk",
          username: "@teslaBoy",
          time: "1.4 hr",
          tweet: "Just did something crazyyyyyyy",
          comments: "100,500",
          retweets: "1,000,032",
          like: "5,000,103",
        },
      ],
    };
  },
};
</script>

<style>
</style>