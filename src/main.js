import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import VueRouter from "./router";

loadFonts();

createApp(App).use(vuetify).use(VueRouter).mount("#app");
