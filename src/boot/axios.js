import { boot } from "quasar/wrappers";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
let server =
  process.env.NODE_ENV == "production"
    ? `https://otmaster.up.railway.app/api/v1/`
    : `http://localhost:8000/api/v1/`;

const api = axios.create({
  baseURL: server,
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
});

const authApi = axios.create({
  baseURL: `${server}auth`,
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$authApi = authApi;
});

export { api, authApi };
