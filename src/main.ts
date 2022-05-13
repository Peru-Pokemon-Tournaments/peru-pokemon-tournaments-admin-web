import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { addComponents } from "./config/global-components.config";
import { addIcons } from "./config/icons.config";
import { router } from "./router";

const app = createApp(App);
const pinia = createPinia();

addComponents(app);
addIcons();

app.use(router);
app.use(pinia);

app.mount("#app");
