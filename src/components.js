import dScrollmanager from "@eng/dscrollmanager.vue";

export default {
    install: (app, options) => {

        app.component("dScrollmanager", dScrollmanager);

    }
}