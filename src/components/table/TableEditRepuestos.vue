<script setup>
import { ref, onBeforeMount, onActivated, defineAsyncComponent } from "vue";
import { createNotify } from "../../utils/Notifications";

import useAuth from "../../composables/useAuth";
import useRepuestos from "src/composables/useRepuestos";

const FormRepuesto = defineAsyncComponent(() =>
  import("components/FormRepuesto.vue")
);

const { isAdmin } = useAuth();
const { getAllRepuestos, getRepuestos, updateRepuesto, deleteRepuesto } =
  useRepuestos();

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
    name: "id_repuesto",
    label: "ID repuesto",
    align: "center",
    field: "id_repuesto",
    sortable: true,
  },
  {
    name: "repuesto",
    align: "center",
    label: "Nombre del repuesto",
    field: "repuesto",
    sortable: true,
  },
  {
    name: "acciones",
    align: "center",
    label: "Acciones",
    field: "acciones",
    sortable: true,
  },
];

const editarItemNombreRepuesto = async (id, value) => {
  const nameObj = {
    repuesto: value,
  };
  console.log("editarItemNombreRepuesto", id, nameObj);
  await updateRepuesto(id, nameObj);
};

const deleteItem = async (value) => {
  if (isAdmin) {
    console.log("delete permitido", value);
    await deleteRepuesto(value);
  } else {
    console.log("no hay permisos");
    createNotify(
      "No tiene permisos de Administrador para eliminar",
      "negative"
    );
  }
};

const init = async () => {
  await getAllRepuestos();
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
      title="Administración de Repuestos"
      :rows="getRepuestos"
      :columns="columns"
      :filter="filter"
      row-key="name"
      binary-state-sort
    >
      <template #top>
        <!-- Formulario -->
        <q-dialog v-model="showDialog">
          <FormRepuesto />
        </q-dialog>
        <!-- Confirmacion de eliminacion -->
        <q-dialog v-model="confirm" persistent>
          <q-card class="">
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="warning" text-color="white" />
              <span class="q-ml-sm"
                >¿Estás seguro de eliminar el repuesto con ID {{ idt }} ?</span
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
          label="Añadir nuevo repuesto"
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
          <q-td key="id_repuesto" :props="props">
            {{ props.row.id_repuesto }}
          </q-td>
          <q-td key="repuesto" :props="props">
            {{ props.row.repuesto }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.repuesto"
              title="Editar nombre de repuesto"
              buttons
              persistent
              @save="
                (val) => editarItemNombreRepuesto(props.row.id_repuesto, val)
              "
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                clearable
                mask="NNNNNNNNNNNNNNNNNNNNNN"
                unmasked-value
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>

          <q-td key="acciones" :props="props">
            <q-btn
              push
              round
              color="red"
              @click="changeConfirm(props.row.id_repuesto)"
              ><q-icon name="delete"
            /></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
