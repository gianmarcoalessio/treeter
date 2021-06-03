import { post } from "@eng/post"
import { bus } from "@eng/bus"



export default {

  install: (app, options) => {
    app.config.globalProperties.$fetch = (add, param) => {
      return post.post(add, param);
    }
    app.config.globalProperties.$post = post;
    app.config.globalProperties.$bus = bus;
    app.config.globalProperties.$globalemit = (key, param) => {
      return bus.emit(key, param);
    }
    app.config.globalProperties.$globalon = (key, fn) => {
      return bus.on(key, fn);
    }
    app.config.globalProperties.$globaloff = (key, fn) => {
      return bus.off(key, fn);
    }
    //app.config.globalProperties.$treets=[]

    app.mixin({
      data() {
        return {
          treets: [],
          page: 0,
          hasmore: false,
          logged: {}
        }
      },
      methods: {
        async load(page) {
          var t = await this.$fetch("servizio/jgFeedMore", {
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
      }
    })

  }
}