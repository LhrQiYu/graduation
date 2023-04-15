import * as ElementPlusIconsVue from "@element-plus/icons-vue";
export default function registerIcons(app) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}
