<script setup>
import { ref } from "vue";
import FormRepuesto from "../components/FormRepuesto.vue";

const columns = [
  {
    name: "idRepuesto",
    required: true,
    label: "ID",
    align: "center",
    field: (row) => row.idRepuesto,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nombreRepuesto",
    align: "center",
    label: "Nombre del Repuesto",
    field: "nombreRepuesto",
    sortable: true,
  },
];

const originalRows = [
  {
    idRepuesto: "122",
    nombreRepuesto: "Pantalla de Touch ID",
  },
  {
    idRepuesto: "313",
    nombreRepuesto: "Batería Samsung",
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
  <FormRepuesto />

  <!--Aca empieza la Q-table-->
  <div class="q-pa-xl" style="max-width: 700px">
    <q-table
      title="Repuestos"
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
