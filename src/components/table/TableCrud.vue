<script setup>
import { ref } from "vue";
import FormTicket from "../FormTicket.vue";

let show_dialog = ref(false);
let editedIndex = -1;
let editedItem = {
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
  sodium: 0,
  calcium: "0%",
  iron: "0%",
};
const defaultItem = {
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
  sodium: 0,
  calcium: "0%",
  iron: "0%",
};
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
const data = [
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
const changeDialog = () => {
  show_dialog.value = !show_dialog.value;
};

const addRow = () => {
  changeDialog();
  if (editedIndex > -1) {
    Object.assign(data[editedIndex], editedItem);
  } else {
    data.push(editedItem);
  }
  close();
};
const deleteItem = (item) => {
  addRow();
  const index = data.indexOf(item);
  confirm("Are you sure you want to delete this item?") &&
    data.splice(index, 1);
};
const editItem = (item) => {
  editedIndex = data.indexOf(item);
  editedItem = Object.assign({}, item);
  show_dialog = true;
};
const close = () => {
  show_dialog = false;
  setTimeout(() => {
    editedItem = Object.assign({}, defaultItem);
    editedIndex = -1;
  }, 300);
};
</script>

<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template #top>
        <q-btn
          flat
          outline
          dense
          color="primary"
          label="Añadir Ticket"
          @click="changeDialog"
        ></q-btn>
        <!-- Dialog -->
        <div class="q-pa-sm q-gutter-sm">
          <q-dialog v-model="show_dialog">
            <FormTicket />
          </q-dialog>
        </div>
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td key="desc" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name">
              <q-input
                v-model="props.row.name"
                dense
                autofocus
                counter
              ></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row.calories }}
            <q-popup-edit
              v-model="props.row.calories"
              title="Update calories"
              buttons
            >
              <q-input
                v-model="props.row.calories"
                type="number"
                dense
                autofocus
              ></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="fat" :props="props">
            <div class="text-pre-wrap">{{ props.row.fat }}</div>
            <q-popup-edit v-model="props.row.fat">
              <q-input
                v-model="props.row.fat"
                type="textarea"
                dense
                autofocus
              ></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="carbs" :props="props">
            {{ props.row.carbs }}
            <q-popup-edit
              v-model="props.row.carbs"
              title="Update carbs"
              buttons
              persistent
            >
              <q-input
                v-model="props.row.carbs"
                type="number"
                dense
                autofocus
                hint="close"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
          <q-td key="iron" :props="props">{{ props.row.iron }}</q-td>
          <q-td key="actions" :props="props">
            <q-btn
              color="blue"
              label="update"
              size="sm"
              @click="editItem(props.row)"
            ></q-btn>
            <q-btn
              color="red"
              label="delete"
              size="sm"
              @click="deleteItem(props.row)"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
