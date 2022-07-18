<script setup>
import { ref, onMounted } from "vue";
import FormTicket from "components/FormTicket.vue";
import useAuth from "../../composables/useAuth";
import useTicket from "../../composables/useTickets";
const { isAdmin } = useAuth();
const { getAllTickets, getTickets } = useTicket();

onMounted(async () => {
  await getAllTickets();
});

let showDialog = ref(false);
const filter = ref("");
const changeShow = () => {
  showDialog.value = !showDialog.value;
};

const columns = [
  {
    name: "id_ticket",
    align: "center",
    label: "ID Ticket",
    field: "ticket",
    sortable: true,
  },
  {
    name: "clientesRutCliente",
    align: "center",
    label: "Cliente",
    field: "clienteAtendido",
    sortable: true,
  },
  {
    name: "colaboradoresRutColaborador",
    align: "center",
    label: "Quién Atendió",
    field: "colaboradorAtiende",
    sortable: true,
  },
  {
    name: "dispositivosIdDispositivo",
    align: "center",
    label: "Dispositivo",
    field: "dispositivoAtendido",
    sortable: true,
  },
  {
    name: "problema_ticket",
    align: "center",
    label: "Problema",
    field: "problemaTicket",
    sortable: true,
  },
  {
    name: "diagnostico_ticket",
    align: "center",
    label: "Dignóstico",
    field: "diagnosticoTicket",
    sortable: true,
  },
  {
    name: "resolucion_ticket",
    align: "center",
    label: "Resolución",
    field: "resolucionTicket",
    sortable: true,
  },
  {
    name: "estado_ticket",
    align: "center",
    label: "Estado",
    field: "estadoTicket",
    sortable: true,
  },
  {
    name: "acciones",
    label: "Acciones",
    field: "acciones",
    align: "center",
  },
];

const rows = getTickets.value;
const editarItem = (value) => {
  console.log("editar", value);
};

const deleteItem = (value) => {
  isAdmin
    ? console.log("delete permitido", value)
    : console.log("no hay permisos");
};
</script>

<template>
  <div class="q-pa-md">
    <FormTicket />
    <q-table
      title="Administración de Tickets"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      row-key="name"
      binary-state-sort
    >
      <template #top>
        <q-dialog v-model="showDialog">
          <FormTicket />
        </q-dialog>
        <q-btn
          color="primary"
          :disable="loading"
          label="Añadir Ticket"
          @click="changeShow"
        ></q-btn>
        <q-space />
        <q-input
          v-model="filter"
          borderless
          outlined
          dense
          debounce="300"
          color="primary"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td key="id_ticket" :props="props">
            {{ props.row.id_ticket }}
            <q-popup-edit v-slot="scope" v-model="props.row.name">
              <q-input v-model="scope.value" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="clientesRutCliente" :props="props">
            {{ props.row.clientesRutCliente }}
          </q-td>
          <q-td key="colaboradoresRutColaborador" :props="props">
            <div class="text-pre-wrap">
              {{ props.row.colaboradoresRutColaborador }}
            </div>
          </q-td>
          <q-td key="dispositivosIdDispositivo" :props="props">
            {{ props.row.dispositivosIdDispositivo }}
          </q-td>
          <q-td key="problema_ticket" :props="props">{{
            props.row.problema_ticket
          }}</q-td>
          <q-td key="diagnostico_ticket" :props="props">{{
            props.row.diagnostico_ticket
          }}</q-td>
          <q-td key="resolucion_ticket" :props="props">{{
            props.row.resolucion_ticket
          }}</q-td>
          <q-td key="estado_ticket" :props="props">{{
            props.row.estado_ticket
          }}</q-td>
          <q-td key="acciones" :props="props">
            <q-btn push rounded color="blue" @click="editarItem(props.row)"
              ><q-icon name="edit"
            /></q-btn>
            <q-btn
              push
              rounded
              color="red"
              @click="deleteItem(props.row.id_ticket)"
              ><q-icon name="delete"
            /></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
