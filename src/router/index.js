import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@views/Login/index.vue"),
  },
  {
    path: "/home",
    component: () => import("@views/Home/index.vue"),
    redirect: "/home/admin",
    children: [
      {
        path: "admin",
        component: () => import("@views/Admin/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/login",
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
