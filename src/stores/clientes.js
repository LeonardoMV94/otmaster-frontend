import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { useAuthStore } from "./auth";

const auth = useAuthStore();

export const useClientesStore = defineStore("clientes", {
  state: () => ({
    clientes: [],
    cliente: {},
  }),
  getters: {
    getClientes: (state) => state.clientes,
    getOnlyRuts: (state) => state.clientes.map((c) => c.rut_cliente),
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
    async getClienteById(rut_colaborador) {
      const token = auth.getToken;
      const { data } = await api.get(`/clientes/${rut_colaborador}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      this.cliente = data;
    },
    async createCliente(data) {
      const token = auth.getToken;
      await api
        .post("/clientes/add/", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          Notify.create({
            message: `Cliente ${response.data.rut_cliente} creado exitosamente!`,
            type: "positive",
            actions: [
              {
                label: "Cerrar",
                color: "white",
              },
            ],
          });
          console.log(response);
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.message,
            type: "negative",
            actions: [
              {
                label: "Cerrar",
                color: "white",
              },
            ],
          });
          console.log("Error", error.response.data.message);
        });

      this.getAllClientes();
    },
    async updateCliente(rut_colaborador, data) {
      const token = auth.getToken;
      console.log("updateCliente actions:", rut_colaborador, data);
      await api
        .put(`clientes/update/${rut_colaborador}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          Notify.create({
            message: `Cliente ${response.data.rut_cliente} actualizado exitosamente!`,
            type: "positive",
            actions: [
              {
                label: "Cerrar",
                color: "white",
              },
            ],
          });
          console.log(response);
        })
        .catch((error) => {
          Notify.create({
            message: error.response.data.errors[0].message,
            type: "negative",
            actions: [
              {
                label: "Cerrar",
                color: "white",
              },
            ],
          });
          console.log("Error", error.response.data.message);
        });
      this.getAllClientes();
    },
    async deleteCliente(rut_colaborador) {
      const token = auth.getToken;
      await api
        .delete(`clientes/delete/${rut_colaborador}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          Notify.create({
            message: `Cliente ${data} eliminado exitosamente!`,
            type: "negative",
            caption: "Cuidado al eliminar!",
            progress: true,
            actions: [
              {
                label: "Cerrar",
                color: "white",
              },
            ],
          });
          this.clientes = this.clientes.filter(
            (cli) => cli.rut_cliente !== rut_colaborador
          );
          console.log("deleteCliente ACTIONS: ", data);
        })
        .catch((error) => {
          console.log("deleteCliente ACTIONS: ", error.response.data.message);
          Notify.create({
            message: error.response.data.message,
            type: "negative",
            actions: [
              {
                label: "Cerrar",
                color: "white",
              },
            ],
          });
          console.log("Error", error.response.data.message);
        });

      this.getAllClientes();
    },
  },
});
