<script setup>
import { defineAsyncComponent } from "vue";

const TableEditDispositivo = defineAsyncComponent(() =>
  import("../components/table/TableEditDispositivos.vue")
);
</script>
<template>
  <q-page padding>
    <TableEditDispositivo />
  </q-page>
</template>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
