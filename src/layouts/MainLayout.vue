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

        <q-chip color="orange" text-color="white" icon="person"
          >Nombre Usuario</q-chip
        >
        <q-btn flat round dense icon="logout" />
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
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pl-xl">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Ticket",
    caption: "",
    icon: "home_repair_service",
    link: "tickets",
  },
  {
    title: "Clientes",
    caption: "",
    icon: "groups",
    link: "clientes",
  },
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
  },
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
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      miniState: ref(true),
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
