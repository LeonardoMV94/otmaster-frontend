<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          OtMaster - Sistema de tickets de soporte
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container
      class="bg-blue window-height window-width row justify-center items-center"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style>
.container-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
