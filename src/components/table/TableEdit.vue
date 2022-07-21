<script setup>
import { ref, onBeforeMount, onActivated, defineAsyncComponent } from "vue";
import { createNotify } from "../../utils/Notifications";

import useAuth from "../../composables/useAuth";
import useTicket from "../../composables/useTickets";
import useCliente from "../../composables/useCliente";
import useColaborador from "../../composables/useColaboradores";

const FormTicket = defineAsyncComponent(() =>
  import("components/FormTicket.vue")
);

const { isAdmin } = useAuth();
const { getClienteByRut } = useCliente();
const { getAllColaboradores, getColabByRut } = useColaborador();
const {
  getAllTickets,
  deleteTicket,
  getTickets,
  updateTicket,
  getAllEstados,
  getEstadosSelects,
} = useTicket();

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
    label: "Problema (Editable)",
    field: "problemaTicket",
    sortable: true,
  },
  {
    name: "diagnostico_ticket",
    align: "center",
    label: "Dignóstico (Editable)",
    field: "diagnosticoTicket",
    sortable: true,
  },
  {
    name: "resolucion_ticket",
    align: "center",
    label: "Resolución (Editable)",
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
    name: "items.repuesto",
    align: "center",
    label: "Repuestos",
    field: "items.repuesto",
    sortable: true,
  },
  {
    name: "acciones",
    label: "Acciones",
    field: "acciones",
    align: "center",
  },
];
const editarItemProblema = async (id, value) => {
  const proObj = {
    problema_ticket: value,
  };
  console.log("editarItemProblema", id, proObj);
  await updateTicket(id, proObj);
};
const editarItemDiagnostico = async (id, value) => {
  const diagObj = {
    diagnostico_ticket: value,
  };
  console.log("editarItemDiagnostico", id, diagObj);
  await updateTicket(id, diagObj);
};
const editarItemResolucion = async (id, value) => {
  const resObj = {
    resolucion_ticket: value,
  };
  console.log("editarItemResolucion", id, resObj);
  await updateTicket(id, resObj);
};
const editarItemEstado = async (id, value) => {
  const esObj = {
    estado_ticket: value,
  };
  console.log("editarItemResolucion", id, esObj);
  await updateTicket(id, esObj);
};
const deleteItem = async (value) => {
  if (isAdmin) {
    console.log("delete permitido", value);
    await deleteTicket(value);
  } else {
    console.log("no hay permisos");
    createNotify(
      "No tiene permisos de Administrador para eliminar",
      "negative"
    );
  }
};

// estados
const estados = [
  {
    estado: "Abierto",
    color: "green",
  },
  {
    estado: "En Progreso",
    color: "yellow",
  },
  {
    estado: "Terminado",
    color: "blue",
  },
  {
    estado: "Cancelado",
    color: "red",
  },
];

const init = async () => {
  await getAllTickets();
  await getAllColaboradores();
  await getAllEstados();
};
onBeforeMount(async () => {
  await init();
});
onActivated(async () => {
  await init();
});
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Administración de Tickets"
      :rows="getTickets"
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
          <q-card class="">
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
                color="negative"
                @click="deleteItem(idt)"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-btn
          color="primary"
          label="Añadir Ticket"
          icon="add"
          @click="changeShow"
        ></q-btn>
        <q-space />
        <q-input v-model="filter" outlined dense debounce="300" color="primary">
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td key="id_ticket" :props="props">
            {{ props.row.id_ticket }}
          </q-td>
          <q-td key="clientesRutCliente" :props="props">
            {{ props.row.clientesRutCliente }}
            <q-tooltip>
              {{ getClienteByRut(props.row.clientesRutCliente).nombre_cliente }}
              {{ getClienteByRut(props.row.clientesRutCliente).appat_cliente }}
              {{ getClienteByRut(props.row.clientesRutCliente).apmat_cliente }}
            </q-tooltip>
          </q-td>
          <q-td key="colaboradoresRutColaborador" :props="props">
            <div class="text-pre-wrap">
              {{ props.row.colaboradoresRutColaborador }}
              <q-tooltip>
                {{
                  getColabByRut(props.row.colaboradoresRutColaborador)
                    .nombre_colaborador
                }}
                {{
                  getColabByRut(props.row.colaboradoresRutColaborador)
                    .appat_colaborador
                }}
                {{
                  getColabByRut(props.row.colaboradoresRutColaborador)
                    .apmat_colaborador
                }}
              </q-tooltip>
            </div>
          </q-td>
          <q-td key="dispositivosIdDispositivo" :props="props">
            {{ props.row.dispositivos?.num_serie_dispositivo || "Nulo" }}
            <q-tooltip>
              {{ props.row.dispositivos?.modelo || "Nulo" }}
            </q-tooltip>
          </q-td>
          <q-td key="problema_ticket" :props="props">
            {{ props.row.problema_ticket }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.problema_ticket"
              title="Editar Problema"
              buttons
              persistent
              @save="(val) => editarItemProblema(props.row.id_ticket, val)"
            >
              <q-input
                v-model="scope.value"
                type="textarea"
                autofocus
                counter
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>
          <q-td key="diagnostico_ticket" :props="props">
            {{ props.row.diagnostico_ticket }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.diagnostico_ticket"
              title="Editar diagnóstico"
              buttons
              persistent
              @save="(val) => editarItemDiagnostico(props.row.id_ticket, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                type="textarea"
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="resolucion_ticket" :props="props">
            {{ props.row.resolucion_ticket }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.resolucion_ticket"
              title="Editar resolución"
              buttons
              persistent
              @save="(val) => editarItemResolucion(props.row.id_ticket, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                type="textarea"
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="estado_ticket" :props="props">
            <q-badge :color="estados[props.row.estado_ticket - 1].color">
              {{ estados[props.row.estado_ticket - 1].estado }}
              <q-popup-edit
                v-slot="scope"
                v-model="props.estado_ticket"
                title="Editar estado de ticket"
                buttons
                persistent
                @save="
                  (val) => editarItemEstado(props.row.id_ticket, val.value)
                "
              >
                <q-select
                  v-model="scope.value"
                  outlined
                  label-color="primary"
                  input-debounce="0"
                  map-options
                  behavior="menu"
                  :options="getEstadosSelects"
                  ><template #no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No hay estados
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-popup-edit>
            </q-badge>
          </q-td>
          <q-td key="items.repuesto" :props="props">
            {{ props.row.items.map((r) => r.repuesto) }}
          </q-td>
          <q-td key="acciones" :props="props">
            <q-btn
              push
              round
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
