import "animate.css";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import ServiceProvider from "./config/providers.config";
import Toast from "vue-toastification";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { addComponents } from "./config/global-components.config";
import { addIcons } from "./config/icons.config";
import { router } from "./router";

const app = createApp(App);
const pinia = createPinia();

pinia.use(() => {
  return {
    ...ServiceProvider,
  };
});

addComponents(app);
addIcons();

app.use(router);
app.use(pinia);
app.use(Toast);

app.mount("#app");
