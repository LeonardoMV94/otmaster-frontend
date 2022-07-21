<script setup>
import { defineAsyncComponent } from "vue";
const TableEditMarcaDis = defineAsyncComponent(() =>
  import("../components/table/TableEditMarcaDispositivo.vue")
);
</script>
<template>
  <q-page padding>
    <TableEditMarcaDis />
  </q-page>
</template>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
