<script setup>
import { ref, onBeforeMount, onActivated, defineAsyncComponent } from "vue";
import { createNotify } from "../../utils/Notifications";

import useAuth from "../../composables/useAuth";
// import useColaborador from "../../composables/useColaboradores";
import useCliente from "src/composables/useCliente";
const FormCliente = defineAsyncComponent(() =>
  import("components/FormCliente.vue")
);

const { isAdmin } = useAuth();

const { getAllClientes, getClientes, updateCliente, deleteCliente } =
  useCliente();

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
    name: "rut_cliente",
    label: "Rut Cliente",
    align: "center",
    field: "rut_cliente",
    sortable: true,
  },
  {
    name: "nombre_cliente",
    align: "center",
    label: "Nombre",
    field: "nombre_cliente",
    sortable: true,
  },
  {
    name: "appat_cliente",
    align: "center",
    label: "Apellido Paterno",
    field: "appat_cliente",
    sortable: true,
  },
  {
    name: "apmat_cliente",
    align: "center",
    label: "Apellido Materno",
    field: "apmat_cliente",
    sortable: true,
  },
  {
    name: "correo_cliente",
    align: "center",
    label: "Correo",
    field: "correo_cliente",
    sortable: true,
  },
  {
    name: "tel_cliente",
    align: "center",
    label: "Teléfono",
    field: "telCliente",
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
const editarItemNombre = async (id, value) => {
  const nameObj = {
    nombre_cliente: value,
  };
  console.log("editarItemNombre", id, nameObj);
  await updateCliente(id, nameObj);
};
const editarItemApPat = async (id, value) => {
  const patObj = {
    appat_cliente: value,
  };
  console.log("editarItemApPat", id, patObj);
  await updateCliente(id, patObj);
};
const editarItemApMat = async (id, value) => {
  const matObj = {
    apmat_cliente: value,
  };
  console.log("editarItemApMat", id, matObj);
  await updateCliente(id, matObj);
};
const editarItemCorreo = async (id, value) => {
  const mailObj = {
    correo_cliente: value,
  };
  console.log("editarItemCorreo", id, mailObj);
  await updateCliente(id, mailObj);
};
const editarItemTel = async (id, value) => {
  const telObj = {
    tel_cliente: value,
  };
  console.log("editarItemTel", id, telObj);
  await updateCliente(id, telObj);
};

const deleteItem = async (value) => {
  if (isAdmin) {
    console.log("delete permitido", value);
    await deleteCliente(value);
  } else {
    console.log("no hay permisos");
    createNotify(
      "No tiene permisos de Administrador para eliminar",
      "negative"
    );
  }
};
const isValidEmail = (mail) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(mail) || "Email inválido";
};

const init = async () => {
  await getAllClientes();
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
      title="Administración de Clientes"
      :rows="getClientes"
      :columns="columns"
      :filter="filter"
      row-key="name"
      binary-state-sort
    >
      <template #top>
        <!-- Formulario -->
        <q-dialog v-model="showDialog">
          <FormCliente />
        </q-dialog>
        <!-- Confirmacion de eliminacion -->
        <q-dialog v-model="confirm" persistent>
          <q-card class="">
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="warning" text-color="white" />
              <span class="q-ml-sm"
                >¿Estás seguro de eliminar el cliente con rut {{ idt }} ?</span
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
          label="Añadir nuevo cliente"
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
          <q-td key="rut_cliente" :props="props">
            {{ props.row.rut_cliente }}
          </q-td>
          <q-td key="nombre_cliente" :props="props">
            {{ props.row.nombre_cliente }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.nombre_cliente"
              title="Editar Nombre"
              buttons
              persistent
              @save="(val) => editarItemNombre(props.row.rut_cliente, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="SSSSSSSSSSSSSSSSSSSS"
                unmasked-value
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>
          <q-td key="appat_cliente" :props="props">
            <div class="text-pre-wrap">
              {{ props.row.appat_cliente }}
              <q-popup-edit
                v-slot="scope"
                v-model="props.row.appat_cliente"
                title="Editar apellido paterno"
                buttons
                persistent
                @save="(val) => editarItemApPat(props.row.rut_cliente, val)"
              >
                <q-input
                  v-model="scope.value"
                  autofocus
                  counter
                  mask="SSSSSSSSSSSSSSSSSSSS"
                  unmasked-value
                  @keyup.enter.stop
                />
              </q-popup-edit>
            </div>
          </q-td>
          <q-td key="apmat_cliente" :props="props">
            {{ props.row.apmat_cliente }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.apmat_cliente"
              title="Editar apellido materno"
              buttons
              persistent
              @save="(val) => editarItemApMat(props.row.rut_cliente, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="SSSSSSSSSSSSSSSSSSSS"
                unmasked-value
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>
          <q-td key="correo_cliente" :props="props">
            {{ props.row.correo_cliente }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.correo_cliente"
              title="Editar correo"
              buttons
              persistent
              @save="(val) => editarItemCorreo(props.row.rut_cliente, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                :rules="[
                  (val) => !!val > 0 || 'Ingresa un email.',
                  (val) => isValidEmail(val),
                ]"
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>
          <q-td key="tel_cliente" :props="props">
            {{ props.row.tel_cliente }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.tel_cliente"
              title="Editar teléfono"
              buttons
              persistent
              @save="(val) => editarItemTel(props.row.rut_cliente, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="(#) ########"
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
              @click="changeConfirm(props.row.rut_cliente)"
              ><q-icon name="delete"
            /></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
