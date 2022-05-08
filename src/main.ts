import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { addIcons } from "./config/icons.config";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

addIcons();

app.use(router);
app.use(pinia);

app.mount("#app");
