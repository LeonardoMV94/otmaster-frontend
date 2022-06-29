<template>
  <!--Acá Empieza el formulario-->

  <div class="q-pa-lg" style="max-width: 700px">
    <h4 class="text-center">Agregar un Colaborador</h4>
    <q-card class="q-pa-md">
      <q-form @submit="onSubmit">
        <div class="row">
          <div class="col">
            <q-input
              v-model="idColaborador"
              color="grey-3"
              label-color="primary"
              outlined
              label="ID"
              mask="########"
              fill-mask
            >
              <template #append>
                <q-icon name="badge" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="nombreColaborador"
              label-color="primary"
              outlined
              label="Nombre del Colaborador"
              mask="SSSSSSSSSSSSSSSSSSSS"
              fill-mask
            >
              <template #append>
                <q-icon name="event" color="black" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="apPatColaborador"
              color="grey-3"
              label-color="primary"
              outlined
              fill-mask
              label="Apellido Paterno"
              mask="SSSSSSSSSSSSSSSSSSSS"
            >
              <template #append>
                <q-icon name="event" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="apMatColaborador"
              color="grey-3"
              label-color="primary"
              outlined
              fill-mask
              label="Apellido Materno"
              mask="SSSSSSSSSSSSSSSSSSSS"
            >
              <template #append>
                <q-icon name="event" color="black" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="passColaborador"
              type="password"
              label-color="primary"
              outlined
              label="Contraseña Colaborador"
            >
              <template #append>
                <q-icon name="event" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-select
              v-model="rolColaborador"
              outlined
              :options="options"
              :dense="dense"
              :options-dense="denseOpts"
              label="Tipo de Rol"
            >
              <template #append>
                <q-icon name="event" color="black" />
              </template>
            </q-select>
          </div>
        </div>

        <div class="row justify-center">
          <q-btn label="Agregar" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card>
  </div>

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

<script>
import { ref } from "vue";

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

export default {
  name: "ClientesPage",

  setup() {
    //aca van los v-model de los input del formulario, sin esto no se mantiene el texto en el input (se borraba con clickear otro lado)

    const idColaborador = ref(null);
    const nombreColaborador = ref(null);
    const APpatColaborador = ref(null);
    const APmatColaborador = ref(null);
    const passColaborador = ref(null);
    const rolColaborador = ref(null);

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
      idColaborador,
      nombreColaborador,
      APpatColaborador,
      APmatColaborador,
      passColaborador,
      rolColaborador,

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
