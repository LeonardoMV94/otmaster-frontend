<template>
  <!--Acá Empieza el formulario-->

  <div class="q-pa-lg" style="max-width: 700px">
    <h4 class="text-center">Agregar un Cliente</h4>
    <q-card class="q-pa-md">
      <q-form @submit="onSubmit">
        <div class="row">
          <div class="col">
            <q-input
              v-model="idCliente"
              color="grey-3"
              label-color="primary"
              outlined
              label="ID Cliente"
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
              v-model="nombreCliente"
              label-color="primary"
              outlined
              label="Nombre del Cliente"
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
              v-model="apPatCliente"
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
              v-model="apMatCliente"
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
              v-model="correoCliente"
              type="email"
              label-color="primary"
              outlined
              fill-mask
              label="E-mail"
            >
              <template #append>
                <q-icon name="event" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="telCliente"
              color="grey-3"
              label-color="primary"
              outlined
              label="Teléfono"
              mask="(#) ########"
              fill-mask
            >
              <template #append>
                <q-icon name="event" color="black" />
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
  <div class="q-pa-lg" style="max-width: 1400px">
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
    name: "idcliente",
    required: true,
    label: "ID",
    align: "center",
    field: (row) => row.idcliente,
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
    idcliente: "123213",
    nombreCliente: "Benito",
    APpatCliente: "Camelo",
    APmatCliente: "DeNuevo",
    correoCliente: "bcamelo@gmail.com",
    telCliente: "123123",
  },
];

export default {
  name: "ClientesPage",

  setup() {
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
