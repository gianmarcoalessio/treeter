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
        return {}
      },
      methods: {},
    })

  }
}