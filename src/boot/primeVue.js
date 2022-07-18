import { boot } from "quasar/wrappers";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

export default boot(({ app }) => {
  app.use(PrimeVue);
  app.use(ToastService);
});
