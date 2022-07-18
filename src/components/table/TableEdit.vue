<script setup>
import { ref, onMounted } from "vue";
import FormTicket from "components/FormTicket.vue";
import useAuth from "../../composables/useAuth";
import useTicket from "../../composables/useTickets";
const { isAdmin } = useAuth();
const { getAllTickets, deleteTicket, getTickets } = useTicket();

onMounted(async () => {
  await getAllTickets();
});

let showDialog = ref(false);
let confirm = ref(false);
let idt = ref(null);
const filter = ref("");
const changeShow = () => {
  showDialog.value = !showDialog.value;
};
const changeConfirm = (id) => {
  idt.value = id;
  confirm.value = !confirm.value;
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
// const editarItem = (value) => {
//   console.log("editar", value);
// };

const deleteItem = async (value) => {
  if (isAdmin) {
    console.log("delete permitido", value);
    await deleteTicket(value);
  } else {
    console.log("no hay permisos");
  }
};
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Administración de Tickets"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      row-key="name"
      binary-state-sort
    >
      <template #top>
        <!-- Formulario -->
        <q-dialog v-model="showDialog">
          <FormTicket />
        </q-dialog>
        <!-- Confirmacion de eliminacion -->
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="warning" text-color="white" />
              <span class="q-ml-sm"
                >¿Estás seguro de eliminar el ticket nº {{ idt }}?</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn v-close-popup flat label="Cancelar" color="primary" />
              <q-btn
                v-close-popup
                flat
                label="Confirmar"
                color="primary"
                @click="deleteItem(idt)"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-btn
          color="primary"
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
            <!-- <q-btn push rounded color="blue" @click="editarItem(props.row)"
              ><q-icon name="edit"
            /></q-btn> -->
            <q-btn
              push
              rounded
              color="red"
              @click="changeConfirm(props.row.id_ticket)"
              ><q-icon name="delete"
            /></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
