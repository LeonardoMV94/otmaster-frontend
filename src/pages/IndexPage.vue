<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const columns = [
  {
    name: "rut_cliente",
    required: true,
    label: "Rut Cliente",
    align: "left",
    field: (row) => row.rut_cliente,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nombre_cliente",
    required: true,
    label: "Nombre Cliente",
    align: "left",
    field: (row) => row.nombre_cliente,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "appat_cliente",
    required: true,
    label: "Apellido paterno",
    align: "left",
    field: (row) => row.appat_cliente,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "apmat_cliente",
    required: true,
    label: "Apellido Materno",
    align: "left",
    field: (row) => row.apmat_cliente,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "correo_cliente",
    required: true,
    label: "Correo Cliente",
    align: "left",
    field: (row) => row.correo_cliente,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "tel_cliente",
    required: true,
    label: "Contacto",
    align: "left",
    field: (row) => row.tel_cliente,
    format: (val) => `${val}`,
    sortable: true,
  },
];

const rows = ref([]);
const clientes = ref(null);
const $q = useQuasar();
const separator = ref("vertical");
const loadData = () => {
  api
    .get("/clientes", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExMjIyMzM4LCJyb2xlIjoxLCJpYXQiOjE2NTU4Mjk1OTh9.7yf8gREybtZ_-G7hovkEHAoC6AXh29JlyvRpRPVmSyk",
      },
    })
    .then((response) => {
      $q.notify({
        type: "positive",
        message: "Conexion establecida con backend.",
      });
      clientes.value = response.data;
      rows.value = clientes.value;
    })
    .catch((error) => {
      console.log(error);
      $q.notify({
        type: "negative",
        message: "Error al conectar con backend",
      });
    });
};

loadData();
</script>

<template>
  <q-page class="">
    <template v-if="!clientes">
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="n in 5" :key="n">
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="50px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="35px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="65px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="25px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </template>
    <template v-else>
      <div class="q-pa-md">
        <q-table
          title="Clientes"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :separator="separator"
        />
      </div>
    </template>
  </q-page>
</template>
