<script setup>
let series = [14, 23, 10, 20];
let chartOptions = {
  title: {
    text: "Estado de Tickets",
    align: "left",
  },
  chart: {
    type: "polarArea",
  },
  labels: ["Entregado", "diagnosticado", "Recibido", "arreglado"],
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
