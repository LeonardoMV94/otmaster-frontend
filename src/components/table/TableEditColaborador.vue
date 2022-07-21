<script setup>
import { ref, onBeforeMount, onActivated, defineAsyncComponent } from "vue";
import { createNotify } from "../../utils/Notifications";

import useAuth from "../../composables/useAuth";
import useColaborador from "../../composables/useColaboradores";
import useRol from "src/composables/useRoles";
const FormColaborador = defineAsyncComponent(() =>
  import("components/FormColaborador.vue")
);

const { isAdmin } = useAuth();
const { getAllRoles, getRolestoSelect } = useRol();
const {
  getAllColaboradores,
  getColaboradores,
  updateColaborador,
  deleteColaborador,
} = useColaborador();

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
    name: "rut_colaborador",
    label: "Rut Colaborador",
    align: "center",
    field: "rut_colaborador",
    sortable: true,
  },
  {
    name: "nombre_colaborador",
    align: "center",
    label: "Nombre Colaborador",
    field: "nombreColaborador",
    sortable: true,
  },
  {
    name: "appat_colaborador",
    align: "center",
    label: "Apellido Paterno",
    field: "appat_colaborador",
    sortable: true,
  },
  {
    name: "apmat_colaborador",
    align: "center",
    label: "Apellido Materno",
    field: "apmat_colaborador",
    sortable: true,
  },
  {
    name: "roles.nombre_rol",
    align: "center",
    label: "Tipo de Rol",
    field: "roles.nombre_rol",
    sortable: true,
  },
  {
    name: "acciones",
    label: "Acciones",
    field: "acciones",
    align: "center",
  },
];
const editarItemNombre = async (id, value) => {
  const nameObj = {
    nombre_colaborador: value,
  };
  console.log("editarItemNombre", id, nameObj);
  await updateColaborador(id, nameObj);
};
const editarItemApPat = async (id, value) => {
  const patObj = {
    appat_colaborador: value,
  };
  console.log("editarItemApPat", id, patObj);
  await updateColaborador(id, patObj);
};
const editarItemApMat = async (id, value) => {
  const matObj = {
    apmat_colaborador: value,
  };
  console.log("editarItemApMat", id, matObj);
  await updateColaborador(id, matObj);
};
const editarItemRol = async (id, value) => {
  const rolObj = {
    rolesIdRol: value,
  };
  console.log("editarItemRol", id, rolObj);
  await updateColaborador(id, rolObj);
};
const deleteItem = async (value) => {
  if (isAdmin) {
    console.log("delete permitido", value);
    await deleteColaborador(value);
  } else {
    console.log("no hay permisos");
    createNotify(
      "No tiene permisos de Administrador para eliminar",
      "negative"
    );
  }
};

const init = async () => {
  await getAllColaboradores();
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
      title="Administración de Colaboradores"
      :rows="getColaboradores"
      :columns="columns"
      :filter="filter"
      row-key="name"
      binary-state-sort
    >
      <template #top>
        <!-- Formulario -->
        <q-dialog v-model="showDialog">
          <FormColaborador />
        </q-dialog>
        <!-- Confirmacion de eliminacion -->
        <q-dialog v-model="confirm" persistent>
          <q-card class="">
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="warning" text-color="white" />
              <span class="q-ml-sm"
                >¿Estás seguro de eliminar el colaborador con rut
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
          label="Añadir Colaborador"
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
          <q-td key="rut_colaborador" :props="props">
            {{ props.row.rut_colaborador }}
          </q-td>
          <q-td key="nombre_colaborador" :props="props">
            {{ props.row.nombre_colaborador }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.nombre_colaborador"
              title="Editar Nombre"
              buttons
              persistent
              @save="(val) => editarItemNombre(props.row.rut_colaborador, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>
          <q-td key="appat_colaborador" :props="props">
            <div class="text-pre-wrap">
              {{ props.row.appat_colaborador }}
              <q-popup-edit
                v-slot="scope"
                v-model="props.row.appat_colaborador"
                title="Editar apellido paterno"
                buttons
                persistent
                @save="(val) => editarItemApPat(props.row.rut_colaborador, val)"
              >
                <q-input
                  v-model="scope.value"
                  autofocus
                  counter
                  @keyup.enter.stop
                />
              </q-popup-edit>
            </div>
          </q-td>
          <q-td key="apmat_colaborador" :props="props">
            {{ props.row.apmat_colaborador }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.apmat_colaborador"
              title="Editar apellido materno"
              buttons
              persistent
              @save="(val) => editarItemApMat(props.row.rut_colaborador, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>
          <q-td key="roles.nombre_rol" :props="props">
            {{ props.row.roles.nombre_rol }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.rolesIdRol"
              title="Editar rol"
              buttons
              persistent
              @save="
                (val) => editarItemRol(props.row.rut_colaborador, val.id_rol)
              "
            >
              <q-select
                v-model="scope.value"
                outlined
                label-color="primary"
                input-debounce="0"
                map-options
                behavior="menu"
                :options="getRolestoSelect"
                ><template #no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No hay roles
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-popup-edit>
          </q-td>
          <q-td key="acciones" :props="props">
            <q-btn
              push
              round
              color="red"
              @click="changeConfirm(props.row.rut_colaborador)"
              ><q-icon name="delete"
            /></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
