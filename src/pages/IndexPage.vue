<script setup>
import { ref, onMounted } from "vue";
import useCliente from "../composables/useCliente";

const { getAllClientes } = useCliente();

const rows = ref([]);
const clientes = ref(null);
const separator = ref("vertical");

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

onMounted(() => {
  const loadData = async () => {
    const client = await getAllClientes();
    clientes.value = client;
    rows.value = clientes.value;
  };

  loadData();
});
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
