import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { useAuthStore } from "./auth";

const auth = useAuthStore();

export const useColaboradoresStore = defineStore("Colaboradores", {
  state: () => ({
    colaboradores: [],
    colaborador: {},
  }),
  getters: {
    getColaboradores: (state) => state.colaboradores,
    getColaborador: (state) => state.colaborador,
    getOnlyRutCol: (state) => state.colaboradores.map((X) => X.rut_colaborador),
  },
  actions: {
    async getAllColaboradores() {
      const token = await auth.getToken;
      if (token == "") {
        return this.colaboradores;
      }

      const { data } = await api.get("/colaboradores", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("getAllColaboradores ACTIONS: ", data);
      this.colaboradores = data;
    },
    async getColaboradoresById(rut_colaborador) {
      const token = auth.getToken;
      const { data } = await api.get(`/colaboradores/${rut_colaborador}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      this.colaboradores = data;
    },
    async createColaboradores(data) {
      const token = await auth.getToken;
      await api
        .post("/colaboradores/add/", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          Notify.create({
            message: `Colaborador ${response.data.rut_colaborador} creado exitosamente!`,
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

      this.getAllColaboradores();
    },
    async updateColaboradores(rut_colaborador, data) {
      const token = await auth.getToken;
      console.log("updateColaboradores actions:", rut_colaborador, data);
      await api
        .put(`colaboradores/update/${rut_colaborador}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          Notify.create({
            message: `Colaborador ${response.data.rut_cliente} actualizado exitosamente!`,
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
      this.getAllColaboradores();
    },
    async deleteColaborador(rut_colaborador) {
      const token = auth.getToken;
      await api
        .delete(`colaboradores/delete/${rut_colaborador}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          Notify.create({
            message: `Colaborador ${data} eliminado exitosamente!`,
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
          this.colaboradores = this.colaboradores.filter(
            (cli) => cli.rut_colaborador !== rut_colaborador
          );
          console.log("deleteColaborador ACTIONS: ", data);
        })
        .catch((error) => {
          console.log(
            "deleteColaborador ACTIONS: ",
            error.response.data.message
          );
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

      this.getAllColaboradores();
    },
  },
});
