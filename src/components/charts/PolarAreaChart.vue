<script setup>
import useTickets from "../../composables/useTickets";
const { getEstadosTicket } = useTickets();

const mapList = getEstadosTicket.value.map((obj) => obj.cantidad);
console.log("Estados Polar: ", mapList);

let series = mapList;
let chartOptions = {
  title: {
    text: "Estados de Tickets",
    align: "left",
  },
  chart: {
    type: "polarArea",
  },
  labels: ["Abierto", "En Proceso", "Cerrado", "Cancelado"],
  stroke: {
    colors: ["#fff"],
  },
  fill: {
    opacity: 0.8,
  },
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
</script>

<template>
  <apexchart
    height="500"
    width="500"
    type="polarArea"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
