<script setup>
import { defineAsyncComponent } from "vue";
const TableEditRoles = defineAsyncComponent(() =>
  import("../components/table/TableEditRoles.vue")
);
</script>
<template>
  <q-page padding>
    <TableEditRoles />
  </q-page>
</template>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
