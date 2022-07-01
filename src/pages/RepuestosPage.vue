<template>
  <!--Acá Empieza el formulario-->

  <div class="q-pa-xl" style="max-width: 700px">
    <h4 class="text-center">Administración de Repuestos</h4>
    <q-card class="q-pa-md">
      <q-form @submit="onSubmit">
        <div class="row">
          <div class="col">
            <q-input
              v-model="idRepuesto"
              color="grey-3"
              label-color="primary"
              outlined
              label="ID"
              mask="####"
              fill-mask
            >
              <template #append>
                <q-icon name="badge" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="nombreRepuesto"
              label-color="primary"
              outlined
              label="Nombre del Repuesto"
              mask="SSSSSSSSSSSSSSSSSSSS"
              fill-mask
            >
              <template #append>
                <q-icon name="build_circle" color="black" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="row justify-center">
          <q-btn label="Agregar" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card>
  </div>

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

<script>
import { ref } from "vue";

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

export default {
  name: "RepuestosPage",

  setup() {
    //aca van los v-model de los input del formulario, sin esto no se mantiene el texto en el input (se borraba con clickear otro lado)

    const idRepuesto = ref(null);
    const nombreRepuesto = ref(null);

    //configuracion de qtable
    const loading = ref(false);
    const filter = ref("");
    const rowCount = ref(10);
    const rows = ref([...originalRows]);

    return {
      columns,
      rows,
      loading,
      filter,
      rowCount,
      idRepuesto,
      nombreRepuesto,

      // emulate fetching data from server
      addRow() {
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
      },

      removeRow() {
        loading.value = true;
        setTimeout(() => {
          const index = Math.floor(Math.random() * rows.value.length);
          rows.value = [
            ...rows.value.slice(0, index),
            ...rows.value.slice(index + 1),
          ];
          loading.value = false;
        }, 500);
      },
    };
  },
};
</script>
<style lang="sass" scoped>
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
