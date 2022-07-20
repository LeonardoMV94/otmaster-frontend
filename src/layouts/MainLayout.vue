<script setup>
// Documentacion script setup -> https://vuejs.org/api/sfc-script-setup.html

import { ref } from "vue";
import { useRouter } from "vue-router";
// import { getCheckDigit } from "rut.js";

import useAuth from "../composables/useAuth";
import EssentialLink from "components/EssentialLink.vue";

const router = useRouter();
const { username, rol, logout, isAdmin } = useAuth();

const leftDrawerOpen = ref(false);
const miniState = ref(true);

console.log("Soy ", rol.value);

const iconRol = rol.value == "admin" ? "admin_panel_settings" : "person";
console.log("Admin?: ", isAdmin);

const linksList = [
  {
    title: "Dashboard",
    caption: "",
    icon: "dashboard",
    link: "dashboard",
  },
  {
    title: "Ticket",
    caption: "",
    icon: "home_repair_service",
    link: "tickets",
  },
  {
    title: "Clientes",
    caption: "",
    icon: "group",
    link: "clientes",
  },
  // {
  //   title: "Colaboradores",
  //   caption: "",
  //   icon: "support_agent",
  //   link: "colaboradores",
  // },
  // {
  //   title: "Roles",
  //   caption: "",
  //   icon: "admin_panel_settings",
  //   link: "roles",
  // },
  {
    title: "Dispositivos",
    caption: "",
    icon: "devices",
    link: "dispositivos",
  },
  {
    title: "Tipos de Dispositivos",
    caption: "",
    icon: "smartphone",
    link: "tipos-dispositivos",
  },
  {
    title: "Marcas de Dispositivos",
    caption: "",
    icon: "star",
    link: "marcas-dispositivos",
  },
  {
    title: "Repuestos",
    caption: "",
    icon: "build_circle",
    link: "repuestos",
  },
];

if (rol.value == "admin") {
  linksList.push(
    {
      title: "Colaboradores",
      caption: "",
      icon: "support_agent",
      link: "colaboradores",
    },
    {
      title: "Roles",
      caption: "",
      icon: "admin_panel_settings",
      link: "roles",
    }
  );
}

if (process.env.NODE_ENV !== "production") {
  linksList.push({
    title: "Test",
    caption: "",
    icon: "bug_report",
    link: "test",
  });
}

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const logOut = () => {
  logout();
  router.push({ name: "login" });
};
</script>

<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Sistema OTMaster </q-toolbar-title>
        <q-chip color="orange" text-color="white" :icon="iconRol">
          {{ username }}
        </q-chip>
        <q-btn flat round dense icon="logout" @click="logOut" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-list padding>
        <!-- <q-item-label header> Essential Links </q-item-label> -->

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <keep-alive>
      <q-page-container>
        <div class="q-pl-xl">
          <router-view />
        </div>
      </q-page-container>
    </keep-alive>
  </q-layout>
</template>
