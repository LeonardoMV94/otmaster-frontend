<script setup>
import { ref } from "vue";

import FormTicket from "../components/FormTicket.vue";

const columns = [
  {
    name: "idTicket",
    required: true,
    label: "ID Ticket",
    align: "center",
    field: (row) => row.idTicket,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "clienteAtendido",
    align: "center",
    label: "Cliente",
    field: "clienteAtendido",
    sortable: true,
  },
  {
    name: "colaboradorAtiende",
    align: "center",
    label: "Quién Atendió",
    field: "colaboradorAtiende",
    sortable: true,
  },
  {
    name: "dispostivoAtendido",
    align: "center",
    label: "Dispositivo Atendido",
    field: "dispositivoAtendido",
    sortable: true,
  },
  {
    name: "problemaTicket",
    align: "center",
    label: "Problema",
    field: "problemaTicket",
    sortable: true,
  },
  {
    name: "diagnosticoTicket",
    align: "center",
    label: "Dignóstico",
    field: "diagnosticoTicket",
    sortable: true,
  },
  {
    name: "resolucionTicket",
    align: "center",
    label: "Resolución",
    field: "resolucionTicket",
    sortable: true,
  },
  {
    name: "estadoTicket",
    align: "center",
    label: "Estado",
    field: "estadoTicket",
    sortable: true,
  },
];

//filas de la table
const originalRows = [
  {
    idTicket: "123213",
    clienteAtendido: "Lucas" + " Goni", //usaremos nombre compuesto?
    dispositivoAtendido: "Tablet",
    colaboradorAtiende: "Leonardo" + " Munoz", //usaremos nombre compuesto?
    problemaTicket: "Tablet no enciende",
    diagnosticoTicket: "Batería mojada",
    resolucionTicket: "Cambio de Batería",
    estadoTicket: "En progreso",
  },
];

//configuracion de qtable
const loading = ref(false);
const filter = ref("");
const rowCount = ref(10);
const rows = ref([...originalRows]);

// emulate fetching data from server
const addRow = () => {
  loading.value = true;
  setTimeout(() => {
    const index = Math.floor(Math.random() * (rows.value.length + 1)),
      row = originalRows[Math.floor(Math.random() * originalRows.length)];

    if (rows.value.length === 0) {
      rowCount.value = 0;
    }

    row.id = ++rowCount.value;
    const newRow = { ...row }; // extend({}, row, { name: `${row.name} (${row.__count})` })
    rows.value = [
      ...rows.value.slice(0, index),
      newRow,
      ...rows.value.slice(index),
    ];
    loading.value = false;
  }, 500);
};

const removeRow = () => {
  loading.value = true;
  setTimeout(() => {
    const index = Math.floor(Math.random() * rows.value.length);
    rows.value = [
      ...rows.value.slice(0, index),
      ...rows.value.slice(index + 1),
    ];
    loading.value = false;
  }, 500);
};
</script>
<template>
  <!--Acá Empieza el formulario-->
  <FormTicket />
  <!--Aca empieza la Q-table-->
  <div class="q-pa-lg" style="max-width: 1400px">
    <h4 class="text-center">Tickets Registrados</h4>

    <q-table
      title="Tickets"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >
      <template #top>
        <q-btn
          color="primary"
          :disable="loading"
          label="Add row"
          @click="addRow"
        />
        <q-btn
          class="q-ml-sm"
          color="primary"
          :disable="loading"
          label="Remove row"
          @click="removeRow"
        />

        <q-space />
        <q-input
          v-model="filter"
          borderless
          dense
          debounce="300"
          color="primary"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
