<script setup>
import { defineAsyncComponent } from "vue";
const TableEditTipo = defineAsyncComponent(() =>
  import("../components/table/TableEditTipoDispositivo.vue")
);
</script>
<template>
  <q-page padding>
    <TableEditTipo />
  </q-page>
</template>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
