<script setup>
import { ref, onBeforeMount, onActivated, defineAsyncComponent } from "vue";
import { createNotify } from "../../utils/Notifications";

import useAuth from "../../composables/useAuth";
import useRol from "src/composables/useRoles";

const FormRoles = defineAsyncComponent(() =>
  import("components/FormRoles.vue")
);

const { isAdmin } = useAuth();
const { getAllRoles, getRoles, updateRol, deleteRol } = useRol();

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
    name: "id_rol",
    label: "ID",
    align: "center",
    field: "id_rol",
    sortable: true,
  },
  {
    name: "nombre_rol",
    align: "center",
    label: "Nombre del Rol",
    field: "nombre_rol",
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

const editarItemNombreRol = async (id, value) => {
  const nameObj = {
    nombre_rol: value,
  };
  console.log("editarItemNombreRol", id, nameObj);
  await updateRol(id, nameObj);
};

const deleteItem = async (value) => {
  if (isAdmin) {
    console.log("delete permitido", value);
    await deleteRol(value);
  } else {
    console.log("no hay permisos");
    createNotify(
      "No tiene permisos de Administrador para eliminar",
      "negative"
    );
  }
};

const init = async () => {
  await getAllRoles();
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
      title="Administración de Roles"
      :rows="getRoles"
      :columns="columns"
      :filter="filter"
      row-key="name"
      binary-state-sort
    >
      <template #top>
        <!-- Formulario -->
        <q-dialog v-model="showDialog">
          <FormRoles />
        </q-dialog>
        <!-- Confirmacion de eliminacion -->
        <q-dialog v-model="confirm" persistent>
          <q-card class="">
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="warning" text-color="white" />
              <span class="q-ml-sm"
                >¿Estás seguro de eliminar el rol con ID {{ idt }} ?</span
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
          label="Añadir nuevo rol"
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
          <q-td key="id_rol" :props="props">
            {{ props.row.id_rol }}
          </q-td>
          <q-td key="nombre_rol" :props="props">
            {{ props.row.nombre_rol }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.nombre_rol"
              title="Editar nombre de rol"
              buttons
              persistent
              @save="(val) => editarItemNombreRol(props.row.id_rol, val)"
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
              @click="changeConfirm(props.row.id_rol)"
              ><q-icon name="delete"
            /></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
