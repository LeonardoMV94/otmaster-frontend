<script setup>
import { onActivated, onBeforeMount } from "vue";
import useTicket from "src/composables/useTickets";
const { getAllCountRepuestos, getCountAllRepuestos } = useTicket();
console.log(getCountAllRepuestos.value);
const ser = getCountAllRepuestos.value.map((obj) => parseInt(obj.count));
const cate = getCountAllRepuestos.value.map((obj) => obj.repuesto);
console.log("series y categorias: ", ser, cate);
const series = [
  {
    data: ser,
  },
];
const chartOptions = {
  chart: {
    type: "bar",
    height: 380,
  },
  plotOptions: {
    bar: {
      barHeight: "100%",
      distributed: true,
      horizontal: true,
      dataLabels: {
        position: "bottom",
      },
    },
  },
  // colors: [
  //   "#33b2df",
  //   "#546E7A",
  //   "#d4526e",
  //   "#13d8aa",
  //   "#A5978B",
  //   "#2b908f",
  //   "#f9a3a4",
  //   "#90ee7e",
  //   "#f48024",
  //   "#69d2e7",
  // ],
  dataLabels: {
    enabled: true,
    textAnchor: "start",
    style: {
      colors: ["#fff"],
    },
    formatter: function (val, opt) {
      return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
    },
    offsetX: 0,
    dropShadow: {
      enabled: true,
    },
  },
  stroke: {
    width: 1,
    colors: ["#fff"],
  },
  xaxis: {
    categories: cate,
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  title: {
    text: "Repuestos",
    align: "center",
    floating: true,
  },
  subtitle: {
    text: "Cantidad por cada repuesto",
    align: "center",
  },
  tooltip: {
    theme: "dark",
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return "";
        },
      },
    },
  },
};
const init = async () => {
  await getAllCountRepuestos();
};
onActivated(async () => {
  await init();
});
onBeforeMount(async () => {
  await init();
});
</script>

<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="380"
      width="760"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
