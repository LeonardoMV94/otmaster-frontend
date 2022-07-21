<script setup>
import { defineAsyncComponent } from "vue";

const TableEditCliente = defineAsyncComponent(() =>
  import("../components/table/TableEditCliente.vue")
);

const columns = [
  {
    name: "idCliente",
    required: true,
    label: "ID",
    align: "center",
    field: (row) => row.idCliente,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nombreCliente",
    align: "center",
    label: "Nombre",
    field: "nombreCliente",
    sortable: true,
  },
  {
    name: "APpatCliente",
    align: "center",
    label: "Apellido Paterno",
    field: "APpatCliente",
    sortable: true,
  },
  {
    name: "APmatCliente",
    align: "center",
    label: "Apellido Materno",
    field: "APmatCliente",
    sortable: true,
  },
  {
    name: "correoCliente",
    align: "center",
    label: "Correo",
    field: "correoCliente",
    sortable: true,
  },
  {
    name: "telCliente",
    align: "center",
    label: "Teléfono",
    field: "telCliente",
    sortable: true,
  },
];
console.log(columns);
</script>

<template>
  <q-page padding>
    <TableEditCliente />
  </q-page>
</template>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
