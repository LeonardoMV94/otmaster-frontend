<template>
  <!--Acá Empieza el formulario-->

  <div class="q-pa-lg" style="max-width: 700px">
    <h4 class="text-center">Crear Ticket (Órden Técnica)</h4>
    <q-card class="q-pa-md">
      <q-form @submit="onSubmit">
        <div class="row">
          <div class="col">
            <q-input
              v-model="idTicket"
              color="grey-3"
              label-color="primary"
              outlined
              label="ID Ticket"
              mask="#######"
              fill-mask
            >
              <template #append>
                <q-icon name="badge" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-select
              v-model="cliente"
              outlined
              :options="options"
              :dense="dense"
              :options-dense="denseOpts"
              label="Cliente Atendido"
            >
              <template #append>
                <q-icon name="event" color="black" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-select
              v-model="colaborador"
              outlined
              :options="options"
              :dense="dense"
              :options-dense="denseOpts"
              label="Colaborador que Atiende"
            >
              <template #append>
                <q-icon name="event" color="black" />
              </template>
            </q-select>
          </div>
          <div class="col">
            <q-select
              v-model="dispositivo"
              outlined
              :options="options"
              :dense="dense"
              :options-dense="denseOpts"
              label="Dispositivo Atendido"
            >
              <template #append>
                <q-icon name="event" color="black" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="problemaTicket"
              label="Describa el problema..."
              type="textarea"
              outlined
            />
          </div>
          <div class="col">
            <q-input
              v-model="diagnosticoTicket"
              label="Describa el diagnóstico..."
              type="textarea"
              outlined
            />
          </div>
        </div>
        <div class="row justify-center">
          <div class="col">
            <q-input
              v-model="resolucionTicket"
              label="Describa la resolución..."
              type="textarea"
              outlined
            />
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

<script>
import { ref } from "vue";

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

export default {
  name: "TicketsPage",

  setup() {
    //aca van los v-model de los input del formulario, sin esto no se mantiene el texto en el input (se borraba con clickear otro lado)

    const idTicket = ref(null);
    const cliente = ref(null);
    const colaborador = ref(null);
    const dispositivo = ref(null);
    const problemaTicket = ref(null);
    const resolucionTicket = ref(null);
    const diagnosticoTicket = ref(null);

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

      //retorno de formulario
      idTicket,
      cliente,
      colaborador,
      dispositivo,
      problemaTicket,
      resolucionTicket,
      diagnosticoTicket,
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
