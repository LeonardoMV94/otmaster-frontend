<script setup>
import { defineAsyncComponent } from "vue";
const TableEdit = defineAsyncComponent(() =>
  import("components/table/TableEdit.vue")
);
</script>

<template>
  <q-page>
    <TableEdit />
  </q-page>
</template>
