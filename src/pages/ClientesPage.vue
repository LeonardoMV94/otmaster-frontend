<script setup>
import { ref } from "vue";

import FormCliente from "../components/FormCliente.vue";

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

const originalRows = [
  {
    idCliente: "123213",
    nombreCliente: "Benito",
    APpatCliente: "Camelo",
    APmatCliente: "DeNuevo",
    correoCliente: "bcamelo@gmail.com",
    telCliente: "123123",
  },
];

//configuracion de qtable
const loading = ref(false);
const filter = ref("");
const rowCount = ref(10);
const rows = ref([...originalRows]);

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
  <q-page padding>
    <FormCliente />

    <!--Aca empieza la Q-table-->
    <div class="q-pa-lg" style="max-width: 1400px">
      <h4 class="text-center">Clientes Registrados</h4>

      <q-table
        title="Clientes"
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
            fill
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
