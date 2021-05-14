<template>
      <div>
        <button class="h-12 w-12 focus:outline-none hover:bg-lightgreen text-3xl rounded-full text-darkgreen">
          <i class="fab fa-pagelines"></i>
        </button>
        <div v-for="(tab,i) in tabs" :key="i">
            
            <jgPulsante :icon="tab.icon" :title="tab.title" :id="tab.id" @premi="premi2($event)" :selezionato="id" /> 

        </div>
          <button class="text-white bg-green rounded-full font-semibold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 hover:bg-darkgreen">
            <p class="hidden lg:block">Tweet</p>
            <i class="fas fa-plus lg:hidden"></i>
          </button>          
      </div>
</template>

<script>
import jgPulsante from "@comp/pulsante.vue"

export default {
  data() {
    return {
      id: "home",
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
  components:{
      jgPulsante,
  },
  methods: {
      premi2(a){
          this.id =a.id
      }
  },
};
</script>

<style>
</style>