<script setup>
import { onMounted, defineAsyncComponent, onActivated } from "vue";
import useTickets from "../composables/useTickets";

const Pie = defineAsyncComponent(() =>
  import("src/components/charts/PieChart.vue")
);

const CustomTable = defineAsyncComponent(() =>
  import("../components/charts/CustomDataTable.vue")
);

const { getAllEstados, getAllCountRepuestos } = useTickets();

const init = async () => {
  await getAllEstados();
  await getAllCountRepuestos();
};

onMounted(async () => {
  await init();
});
onActivated(async () => {
  await init();
});
</script>

<template>
  <q-page padding>
    <div class="flex justify-center">
      <CustomTable />
      <Pie />
    </div>
  </q-page>
</template>
