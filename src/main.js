import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/index";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import registerIcons from "./global";
const pinia = createPinia();
createApp(App)
  .use(ElementPlus)
  .use(pinia)
  .use(registerIcons)
  .use(router)
  .mount("#app");
