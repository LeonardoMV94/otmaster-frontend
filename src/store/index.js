// import { store } from "quasar/wrappers";
import { createStore } from "vuex";

// import example from './module-example'
import auth from "./auth";
import clientes from "./clientes";

const store = createStore({
  modules: {
    auth,
    clientes,
  },
});

export default store;
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// export default store(function (/* { ssrContext } */) {
//   const Store = createStore({
//     modules: {
//       // example
//       auth,
//     },

//     // enable strict mode (adds overhead!)
//     // for dev mode and --debug builds only
//     strict: process.env.DEBUGGING,
//   });

//   return Store;
// });
