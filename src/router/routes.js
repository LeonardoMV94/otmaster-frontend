import isAuthenticatedGuard from "./AuthGuard";

const routes = [
  {
    path: "/",
    beforeEnter: [isAuthenticatedGuard],
    name: "home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "homeIndex",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "clientes",
        name: "clientes",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "loginLayout",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", name: "login", component: () => import("pages/Login.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
