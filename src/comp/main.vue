<template>
  <div class="flex container h-screen w-full">
    <!-- side nav -->
    <div
      class="
        lg:w-1/5
        border-r border-lighter
        px-2
        lg:px-6
        py-2
        flex flex-col
        justify-between
      "
    >
      <jgNavTop :tabs="tabs" />
      <jgNavBottom>
        <!-- <template v-slot:utente>altri dati utente</template>    
                <template v-slot:bottone> aggiungi nuovo utente </template> -->
      </jgNavBottom>
    </div>
    <!-- Treets -->
    <d-scrollmanager class="md:w-1/2">
      <jgTritta @treets="tritta($event)" />
      <jgTreets />
    </d-scrollmanager>
    <!-- Trending -->
    <div
      class="
        md:block
        hidden
        w-1/3
        h-full
        border-l border-lighter
        py-2
        px-6
        overflow-y-scroll
        relative
      "
    >
      <jgTrending />
    </div>
  </div>
</template>

<script>
import jgNavTop from "@comp/navTop.vue";
import jgNavBottom from "@comp/navBottom.vue";
import jgTreets from "@comp/treets.vue";
import jgTritta from "@comp/tritta.vue";
import jgTrending from "@comp/trending.vue";

export default {
  data() {
    return {
      tabs: [
        { icon: "fas fa-home", title: "Home", id: "home" },
        { icon: "fas fa-hashtag", title: "Explore", id: "explore" },
        { icon: "far fa-bell", title: "Notifications", id: "notifications" },
        { icon: "far fa-envelope", title: "Messages", id: "messages" },
        { icon: "far fa-bookmark", title: "Bookmarks", id: "bookmarks" },
        { icon: "fas fa-clipboard-list", title: "Lists", id: "lists" },
        { icon: "far fa-user", title: "Profile", id: "profile" },
        { icon: "fas fa-ellipsis-h", title: "More", id: "more" },
      ],
    };
  },
  components: {
    jgNavTop,
    jgNavBottom,
    jgTreets,
    jgTritta,
    jgTrending,
  },
  methods: {
    tritta(x) {
      this.treets = x;
    },
  },
};
</script>

<style>
</style>