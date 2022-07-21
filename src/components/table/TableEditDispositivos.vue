<script setup>
import { ref, onBeforeMount, onActivated, defineAsyncComponent } from "vue";
import { createNotify } from "../../utils/Notifications";

import useAuth from "../../composables/useAuth";
import useDispositivo from "src/composables/useDispositivo";
import useMarcaDispositivo from "src/composables/useMarcaDispositivo";
import useTipoDispositivo from "src/composables/useTipoDispositivo";

const FormDispositivo = defineAsyncComponent(() =>
  import("components/FormDispositivo.vue")
);

const { isAdmin } = useAuth();

const { getAllMarcaDispositivos, getMDtoSelect } = useMarcaDispositivo();
const { getAllTipoDispositivos, getTDtoSelects } = useTipoDispositivo();
const {
  getAllDispositivos,
  getDispositivos,
  deleteDispositivo,
  updateDispositivo,
} = useDispositivo();

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
    name: "id_dispositivo",
    label: "ID",
    align: "center",
    field: "id_dispositivo",
    sortable: true,
  },
  {
    name: "num_serie_dispositivo",
    align: "center",
    label: "Número de serie",
    field: "num_serie_dispositivo",
    sortable: true,
  },
  {
    name: "tipos.nombre_tipo",
    align: "center",
    label: "Tipo Dispositivo",
    field: "tipos.nombre_tipo",
    sortable: true,
  },
  {
    name: "marcas.nombre_marca",
    align: "center",
    label: "Marca Dispositivo",
    field: "marcas.nombre_marca",
    sortable: true,
  },
  {
    name: "modelo",
    align: "center",
    label: "Modelo Dispotivo",
    field: "modelo",
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

const editarItemNumSerie = async (id, value) => {
  const nameObj = {
    num_serie_dispositivo: value,
  };
  console.log("editarItemNumSerie", id, nameObj);
  await updateDispositivo(id, nameObj);
};
const editarItemTipo = async (id, value) => {
  const tObj = {
    tiposDispositivosIdTipos: value,
  };
  console.log("editarItemTipo", id, tObj);
  await updateDispositivo(id, tObj);
};
const editarItemMarca = async (id, value) => {
  const mObj = {
    marcasDispositivosIdMarcas: value,
  };
  console.log("editarItemMarca", id, mObj);
  await updateDispositivo(id, mObj);
};
const editarItemModelo = async (id, value) => {
  const modeloObj = {
    modelo: value,
  };
  console.log("editarItemModelo", id, modeloObj);
  await updateDispositivo(id, modeloObj);
};

const deleteItem = async (value) => {
  if (isAdmin) {
    console.log("delete permitido", value);
    await deleteDispositivo(value);
  } else {
    console.log("no hay permisos");
    createNotify(
      "No tiene permisos de Administrador para eliminar",
      "negative"
    );
  }
};

const init = async () => {
  await getAllDispositivos();
  await getAllMarcaDispositivos();
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
      title="Administración de Dispositivos"
      :rows="getDispositivos"
      :columns="columns"
      :filter="filter"
      row-key="name"
      binary-state-sort
    >
      <template #top>
        <!-- Formulario -->
        <q-dialog v-model="showDialog">
          <FormDispositivo />
        </q-dialog>
        <!-- Confirmacion de eliminacion -->
        <q-dialog v-model="confirm" persistent>
          <q-card class="">
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="warning" text-color="white" />
              <span class="q-ml-sm"
                >¿Estás seguro de eliminar el dispositivo con ID
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
          label="Añadir nuevo dispositivo"
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
          <q-td key="id_dispositivo" :props="props">
            {{ props.row.id_dispositivo }}
          </q-td>
          <q-td key="num_serie_dispositivo" :props="props">
            {{ props.row.num_serie_dispositivo }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.num_serie_dispositivo"
              title="Editar número de serie"
              buttons
              persistent
              @save="(val) => editarItemNumSerie(props.row.id_dispositivo, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="NNNNNNNNNNNNNNNNNNNNNN"
                unmasked-value
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>
          <q-td key="tipos.nombre_tipo" :props="props">
            {{ props.row.tipos.nombre_tipo }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.tipos.nombre_tipo"
              title="Editar tipo dispositivo"
              buttons
              persistent
              @save="(val) => editarItemTipo(props.row.id_dispositivo, val)"
            >
              <q-select
                v-model="scope.value"
                label-color="primary"
                outlined
                input-debounce="0"
                label="Tipo Dispositivo "
                map-options
                emit-value
                behavior="menu"
                :options="getTDtoSelects"
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>

          <q-td key="marcas.nombre_marca" :props="props">
            {{ props.row.marcas.nombre_marca }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.marcas.nombre_marca"
              title="Editar marca"
              buttons
              persistent
              @save="(val) => editarItemMarca(props.row.id_dispositivo, val)"
            >
              <q-select
                v-model="scope.value"
                color="grey-3"
                label-color="primary"
                outlined
                input-debounce="0"
                label="Marca Dispositivo "
                behavior="menu"
                map-options
                emit-value
                :options="getMDtoSelect"
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>
          <q-td key="modelo" :props="props">
            <div class="text-pre-wrap">
              {{ props.row.modelo }}
              <q-popup-edit
                v-slot="scope"
                v-model="props.row.modelo"
                title="Editar modelo"
                buttons
                persistent
                @save="(val) => editarItemModelo(props.row.id_dispositivo, val)"
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

          <q-td key="acciones" :props="props">
            <q-btn
              push
              round
              color="red"
              @click="changeConfirm(props.row.id_dispositivo)"
              ><q-icon name="delete"
            /></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
