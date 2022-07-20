<script setup>
import { onMounted } from "vue";

import PieChartVue from "src/components/charts/PieChart.vue";
import CustomDataTable from "../components/charts/CustomDataTable.vue";
import useTickets from "../composables/useTickets";
const { getAllEstados } = useTickets();
onMounted(() => {
  (async () => {
    console.log("mounted");
    await getAllEstados();
  })();
});
</script>

<template>
  <q-page padding>
    <div class="flex justify-center">
      <CustomDataTable />
      <PieChartVue />
    </div>
  </q-page>
</template>
