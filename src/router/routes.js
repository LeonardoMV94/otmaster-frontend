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
        component: () => import("pages/IndexPageImg.vue"),
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("pages/DashboardPage.vue"),
      },
      {
        path: "clientes",
        name: "clientes",
        component: () => import("pages/ClientesPage.vue"),
      },
      {
        path: "colaboradores",
        name: "colaboradores",
        component: () => import("src/pages/ColaboradoresPage.vue"),
      },
      {
        path: "roles",
        name: "roles",
        component: () => import("pages/RolesPage.vue"),
      },
      {
        path: "dispositivos",
        name: "dispositivos",
        component: () => import("pages/DispositivosPage.vue"),
      },
      {
        path: "tipos-dispositivos",
        name: "tipos-dispositivos",
        component: () => import("pages/TiposDispositivosPage.vue"),
      },
      {
        path: "marcas-dispositivos",
        name: "marcas-dispositivos",
        component: () => import("pages/MarcasDispositivosPage.vue"),
      },
      {
        path: "repuestos",
        name: "repuestos",
        component: () => import("pages/RepuestosPage.vue"),
      },
      {
        path: "tickets",
        name: "tickets",
        component: () => import("pages/TicketsPage.vue"),
      },
      {
        path: "test",
        name: "test",
        component: () => import("pages/TestPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "loginLayout",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("src/pages/LoginPage.vue"),
      },
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
