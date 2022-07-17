import { defineStore } from "pinia";

export const useEstadosStore = defineStore("estados", {
  state: () => ({
    estados: ["abierto", "en progreso", "terminado", "cancelado"],
  }),
  getters: {
    getEstado: (store) => store.estados,
  },
});
