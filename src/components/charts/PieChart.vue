<script setup>
let series = [44, 55, 13, 43];
let chartOptions = {
  title: {
    text: "Estado de Tickets",
    align: "left",
  },
  chart: {
    width: 380,
    type: "pie",
  },
  labels: ["Entregado", "diagnosticado", "Recibido", "arreglado"],
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
    type="pie"
    width="380"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
