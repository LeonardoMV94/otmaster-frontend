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
      <router-view />
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
    icon: "confirmation_number",
    link: { name: "clientes" },
  },
  {
    title: "Clientes",
    caption: "",
    icon: "group",
    link: "clientes",
  },
  {
    title: "Colaboradores",
    caption: "",
    icon: "support_agent",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Dispositivos",
    caption: "",
    icon: "devices_other",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Repuestos",
    caption: "",
    icon: "build_circle",
    link: "https://twitter.quasar.dev",
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
