<script setup>
import { onMounted, defineAsyncComponent } from "vue";
import useTickets from "../composables/useTickets";

const Pie = defineAsyncComponent(() =>
  import("src/components/charts/PieChart.vue")
);

const CustomTable = defineAsyncComponent(() =>
  import("../components/charts/CustomDataTable.vue")
);

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
      <CustomTable />
      <Pie />
    </div>
  </q-page>
</template>
