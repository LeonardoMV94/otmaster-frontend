<script setup>
import { defineAsyncComponent } from "vue";

const TableEditColaboradores = defineAsyncComponent(() =>
  import("../components/table/TableEditColaborador.vue")
);

const columns = [
  {
    name: "idColaborador",
    required: true,
    label: "ID",
    align: "center",
    field: (row) => row.idColaborador,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nombreColaborador",
    align: "center",
    label: "Nombre",
    field: "nombreColaborador",
    sortable: true,
  },
  {
    name: "APpatColaborador",
    align: "center",
    label: "Apellido Paterno",
    field: "APpatColaborador",
    sortable: true,
  },
  {
    name: "APmatColaborador",
    align: "center",
    label: "Apellido Materno",
    field: "APmatColaborador",
    sortable: true,
  },
  {
    name: "passColaborador",
    align: "center",
    label: "Password",
    field: "passColaborador",
    sortable: true,
  },
  {
    name: "rolColaborador",
    align: "center",
    label: "Tipo de Rol",
    field: "rolColaborador",
    sortable: true,
  },
];
console.log(columns);
</script>

<template>
  <q-page padding>
    <TableEditColaboradores />
  </q-page>
</template>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
