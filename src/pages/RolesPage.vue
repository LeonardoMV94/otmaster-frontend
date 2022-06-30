<template>
  <!--Acá Empieza el formulario-->

  <div class="q-pa-xl" style="max-width: 700px">
    <q-card class="q-pa-md">
      <h4 class="text-center">Administración de Roles</h4>

      <q-form @submit="onSubmit">
        <div class="row">
          <div class="col">
            <q-input
              v-model="idRol"
              color="grey-3"
              label-color="primary"
              outlined
              label="ID"
              mask="##"
              fill-mask
            >
              <template #append>
                <q-icon name="badge" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="nombreRol"
              label-color="primary"
              outlined
              label="Nombre del Rol"
              mask="SSSSSSSSSSSSSSSSSSSS"
              fill-mask
            >
              <template #append>
                <q-icon name="attribution" color="black" />
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
      title="Roles"
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
        <q-input v-model="filter" dense debounce="300" color="primary">
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
    name: "idRol",
    required: true,
    label: "ID",
    align: "center",
    field: (row) => row.idRol,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nombreRol",
    align: "center",
    label: "Nombre del Rol",
    field: "nombreRol",
    sortable: true,
  },
];

const originalRows = [
  {
    idRol: "12",
    nombreRol: "Técnico",
  },
];

export default {
  name: "RolesPage",

  setup() {
    //aca van los v-model de los input del formulario, sin esto no se mantiene el texto en el input (se borraba con clickear otro lado)

    const idRol = ref(null);
    const nombreRol = ref(null);

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
      idRol,
      nombreRol,

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
