<script setup>
import { defineAsyncComponent } from "vue";
const TableEditRepuestos = defineAsyncComponent(() =>
  import("../components/table/TableEditRepuestos.vue")
);
</script>
<template>
  <q-page padding>
    <TableEditRepuestos />
  </q-page>
</template>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
