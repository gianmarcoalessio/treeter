<template>
  <div class="relative">
    <div
      class="absolute bottom-0 right-0 mr-4 mb-4 z-index-20"
      :style="stylebtntop"
    >
      <button
        class="
          text-2xl
          bg-opacity-50 bg-lightest
          text-darkgreen
          w-10
          h-10
          shadow-md
          rounded-full
          hover:bg-lighter
          focus:outline-none
        "
        @click="scrolltop()"
      >
        ⇪
      </button>
    </div>
    <div
      ref="contenitore"
      class="flex-1 h-screen overflow-y-auto"
      @scroll="goscroll()"
    >
      <slot />
    </div>
  </div>
</template>
<script>
import { bus } from "@eng/bus";
export default {
  data() {
    return {
      stylebtntop: { display: "none" },
    };
  },
  methods: {
    goscroll() {
      var v = this.$refs.contenitore;
      this.stylebtntop = { display: v.scrollTop > 0 ? "block" : "none" };
      this.smallmenu = v.scrollTop < 50 ? false : true;
      if (v.scrollTop + v.getClientRects()[0].height * 1.3 > v.scrollHeight) {
        bus.emit("more");
      }
    },
    scrolltop() {
      var el = this.$refs.contenitore;
      el.scrollTop = 0;
    },
  },
};
</script>
