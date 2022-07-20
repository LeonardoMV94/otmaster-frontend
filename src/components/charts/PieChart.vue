<script setup>
import { onActivated, onMounted } from "vue";
import useTickets from "../../composables/useTickets";
const { getEstadosTicket, getAllEstados } = useTickets();

const mapList = getEstadosTicket.value.map((obj) => obj.cantidad);
console.log("Estados PolarPie: ", mapList);
let series = mapList;
let chartOptions = {
  title: {
    text: "Estado de Tickets",
    align: "left",
  },
  chart: {
    width: 500,
    type: "pie",
  },
  labels: ["Abierto", "En Proceso", "Cerrado", "Cancelado"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

onActivated(async () => {
  console.log("activated piechart");
  await getAllEstados();
});
onMounted(async () => {
  console.log("mounted piechart");
  await getAllEstados();
});
</script>

<template>
  <apexchart
    type="pie"
    width="380"
    height="380"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
