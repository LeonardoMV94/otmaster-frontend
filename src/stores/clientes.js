import { defineStore } from "pinia";
import { api } from "boot/axios";
//import { Notify } from "quasar";
import { useAuthStore } from "./auth";

const auth = useAuthStore();

export const useClientesStore = defineStore("clientes", {
  state: () => ({
    clientes: [],
  }),
  getters: {
    getClientes: (state) => state.clientes,
  },
  actions: {
    async getAllClientes() {
      const token = auth.getToken;
      if (token == "") {
        return this.clientes;
      }

      const { data } = await api.get("/clientes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("getAllClientes ACTIONS: ", data);
      this.clientes = data;
    },
  },
});
