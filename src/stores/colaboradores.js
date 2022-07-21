import { defineStore } from "pinia";
import { api } from "boot/axios";
import { createNotify } from "../utils/Notifications";
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
    getColaboradoresSelect: (state) =>
      state.colaboradores.map((m) => ({
        ...m,
        label: `${m.nombre_colaborador} ${m.appat_colaborador} ${m.apmat_colaborador}`,
        value: m.rut_colaborador,
      })),
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
          createNotify(
            `Colaborador ${response.data.rut_colaborador} creado exitosamente!`,
            "positive"
          );
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data.errors[0].message, "negative");
          console.log("Error", error.response.data.message);
        });

      this.getAllColaboradores();
    },
    async updateColaboradores(rut_colaborador, data) {
      const token = await auth.getToken;
      console.log("updateColaboradores actions:", rut_colaborador, data);
      await api
        .patch(`colaboradores/${rut_colaborador}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          createNotify(
            `Colaborador ${response.data.rut_cliente} actualizado exitosamente!`,
            "positive"
          );
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data.errors[0].message, "negative");
          console.log("Error", error.response.data.message);
        });
      this.getAllColaboradores();
    },
    async deleteColaborador(rut_colaborador) {
      const token = auth.getToken;
      if (rut_colaborador == 10111222) {
        createNotify(
          "El usuario SuperAdmin no se puede eliminar!!",
          "regative"
        );
        return;
      }
      await api
        .delete(`colaboradores/delete/${rut_colaborador}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          createNotify(
            `Colaborador ${data.rut_colaborador} eliminado exitosamente!`,
            "negative"
          );
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
          createNotify(error.response.data.message, "negative");
          console.log("Error", error.response.data.message);
        });

      this.getAllColaboradores();
    },
  },
});
