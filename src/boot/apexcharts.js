import VueApexCharts from "vue3-apexcharts";
import { boot } from "quasar/wrappers";

// Examples https://github.com/patrickmonteiro/quasar-apexcharts
export default boot(({ app }) => {
  app.use(VueApexCharts);
});
