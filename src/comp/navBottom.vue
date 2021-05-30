<template>
  <div class="lg:w-full relative">
    <button
      @click="dropdown = !dropdown"
      class="flex items-center w-full mt-3 hover:bg-lightgreen rounded-full p-2 focus:outline-none"
    >
      <i
        class="fas fa-user w-8 h-8 pt-2 rounded-full border border-lighter"
      ></i>
      <!-- <img src="profile.png" alt="" class="w-10 h-10 rounded-full border border-lighter" />  -->
      <div class="hidden lg:block ml-1">
        <p class="text-sm font-bold leading-tight">Your Name</p>
        <p class="text-sm leading-tight">@username</p>
      </div>
      <i class="hidden lg:block fas fa-angle-down ml-auto text-lg"></i>
    </button>
    <div
      v-if="dropdown === true"
      class="absolute bottom-0 left-0 w-64 rounded-lg shadow-md border-lightest bg-white mb-16"
    >
      <button
        @click="dropdown = false"
        class="flex items-center w-full hover:bg-lightest p-2 focus:outline-none"
      >
        <i
          class="fas fa-user w-8 h-8 pt-2 rounded-full border border-lighter"
        ></i>
        <!-- <img src="profile.png" class="w-10 h-10 rounded-full border border-lighter" /> -->
        <div class="ml-4">
          <p class="text-sm font-bold leading-tight">
            {{ logged.name + logged.surname || "Your name" }}
          </p>
          <p class="text-sm leading-tight">
            {{ logged.username || "@username" }}
          </p>

          <slot name="utente"> </slot>
        </div>
        <i class="fas fa-check ml-auto text-green"></i>
      </button>
      <button
        @click="login()"
        class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none"
      >
        <slot name="bottone"> Add an existing account </slot>
      </button>
      <button
        @click="logout()"
        class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none"
      >
        Log out {{ logged.username }}
      </button>
      <slot />
    </div>
  </div>
</template>

<script>
import { bus } from "@eng/bus";
import { post } from "@eng/post";
export default {
  methods: {
    async login() {
      this.logged = await post.post("servizio/jgGetQuery", {
        query:
          "select id,username,name,surname,age,email,sex,picture,special from users order by random()",
      });
      this.logged.name = this.logged.name + " "; //per aggiungere lo spazio tra nome e cognome senza rompere il codice in riga 31
      bus.emit("logged", this.logged.id);
    },
    logout() {
      this.logged = {};
      bus.emit("logout");
    },
  },
  data() {
    return {
      logged: {},
      dropdown: false,
    };
  },
};
</script>

<style>
</style>