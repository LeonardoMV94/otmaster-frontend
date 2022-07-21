<script setup>
import { ref, onBeforeMount, onActivated, defineAsyncComponent } from "vue";
import { createNotify } from "../../utils/Notifications";

import useAuth from "../../composables/useAuth";
import useTipoDispositivo from "src/composables/useTipoDispositivo";

const FormTipoDispositivos = defineAsyncComponent(() =>
  import("components/FormTipoDispositivo.vue")
);

const { isAdmin } = useAuth();
const {
  getAllTipoDispositivos,
  getTiposDispositivos,
  updateTipoDispositivo,
  deleteTipoDispositivo,
} = useTipoDispositivo();

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
    name: "id_tipo",
    label: "ID",
    align: "center",
    field: "id_tipo",
    sortable: true,
  },
  {
    name: "nombre_tipo",
    align: "center",
    label: "Nombre del tipo",
    field: "nombre_tipo",
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

const editarItemNombretipo = async (id, value) => {
  const nameObj = {
    nombre_tipo: value,
  };
  console.log("editarItemNombretipo", id, nameObj);
  await updateTipoDispositivo(id, nameObj);
};

const deleteItem = async (value) => {
  if (isAdmin) {
    console.log("delete permitido", value);
    await deleteTipoDispositivo(value);
  } else {
    console.log("no hay permisos");
    createNotify(
      "No tiene permisos de Administrador para eliminar",
      "negative"
    );
  }
};

const init = async () => {
  await getAllTipoDispositivos();
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
      title="Administración de Tipos de Dispositivos"
      :rows="getTiposDispositivos"
      :columns="columns"
      :filter="filter"
      row-key="name"
      binary-state-sort
    >
      <template #top>
        <!-- Formulario -->
        <q-dialog v-model="showDialog">
          <FormTipoDispositivos />
        </q-dialog>
        <!-- Confirmacion de eliminacion -->
        <q-dialog v-model="confirm" persistent>
          <q-card class="">
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="warning" text-color="white" />
              <span class="q-ml-sm"
                >¿Estás seguro de eliminar el tipo de rol con ID
                {{ idt }} ?</span
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
          label="Añadir nuevo tipo dispositivo"
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
          <q-td key="id_tipo" :props="props">
            {{ props.row.id_tipo }}
          </q-td>
          <q-td key="nombre_tipo" :props="props">
            {{ props.row.nombre_tipo }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.nombre_tipo"
              title="Editar nombre de tipo"
              buttons
              persistent
              @save="(val) => editarItemNombretipo(props.row.id_tipo, val)"
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
              @click="changeConfirm(props.row.id_tipo)"
              ><q-icon name="delete"
            /></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
