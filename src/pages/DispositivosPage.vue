<script setup>
import { ref } from "vue";
import FormDispositivo from "../components/FormDispositivo.vue";

const columns = [
  {
    name: "idDispositivo",
    required: true,
    label: "ID",
    align: "center",
    field: (row) => row.idDispositivo,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "numeroSerieDispositivo",
    align: "center",
    label: "Nombre",
    field: "numeroSerieDispositivo",
    sortable: true,
  },
  {
    name: "modeloDispositivo",
    align: "center",
    label: "Modelo Dispotivo",
    field: "APpatCliente",
    sortable: true,
  },
  {
    name: "marcaDispositivo",
    align: "center",
    label: "Marca Dispositivo",
    field: "marcaDispositivo",
    sortable: true,
  },
  {
    name: "tipoDispositivo",
    align: "center",
    label: "Tipo Dispositivo",
    field: "tipoDispositivo",
    sortable: true,
  },
];

const originalRows = [
  {
    idDispositivo: "123123",
    numeroSerieDispositivo: "123123",
    modeloDispositivo: "L11",
    marcaDispositivo: "Samsung",
    tipoDispositivo: "Notebook",
  },
];

//configuracion de qtable
const loading = ref(false);
const filter = ref("");
const rowCount = ref(10);
const rows = ref([...originalRows]);

// emulate fetching data from server  (botones)
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
  <FormDispositivo />
  <!--Aca empieza la Q-table-->
  <div class="q-pa-lg" style="max-width: 1400px">
    <h4 class="text-center">Dispositivo Registrados</h4>

    <q-table
      title="Tabla de Dispositivos"
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
