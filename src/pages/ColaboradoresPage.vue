<script setup>
import { ref } from "vue";
import FormColaborador from "../components/FormColaborador.vue";

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

const originalRows = [
  {
    idColaborador: "123213",
    nombreColaborador: "Luis",
    APpatColaborador: "Jara",
    APmatColaborador: "Mouche",
    passColaborador: "xxxxxx",
    rolColaborador: "Admin",
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
  <FormColaborador />
  <!--Aca empieza la Q-table-->
  <div class="q-pa-lg" style="max-width: 1400px">
    <h4 class="text-center">Colaboradores Registrados</h4>

    <q-table
      title="Colaboradores"
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
