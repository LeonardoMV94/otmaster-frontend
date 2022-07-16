import { defineStore } from "pinia";
import { api } from "boot/axios";
import { createNotify } from "../utils/Notifications";
import { useAuthStore } from "./auth";

const auth = useAuthStore();

export const useTiposDispositivosStore = defineStore("tiposDispositivos", {
  state: () => ({
    tiposDispositivos: [],
    tipoDispositivo: {},
  }),
  getters: {
    getTipoDispositivos: (state) => state.tiposDispositivos,
    getTipoDispositivo: (state) => state.tipoDispositivo,
  },
  actions: {
    async getAllTipoDispositivos() {
      const token = await auth.getToken;
      if (token == "") {
        return this.tiposDispositivos;
      }
      const { data } = await api.get("/tipos-dispositivos/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("getAllTipoDispositivos ACTIONS: ", data);
      this.tiposDispositivos = data;
    },
    async getTDById(id_dispositivo) {
      const token = await auth.getToken;
      const { data } = await api.get(`/tipos-dispositivos/${id_dispositivo}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      this.tipoDispositivo = data;
    },
    async createTipoDispositivo(data) {
      const token = auth.getToken;
      await api
        .post("/tipos-dispositivos/add/", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          createNotify(
            `Tipo Dispositivo ${response.data.id_rol} creado exitosamente!`,
            "positive"
          );
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data.errors[0].message, "negative");
          console.log("Error", error.response.data.message);
        });

      this.getAllTipoDispositivos();
    },
    async updateTD(id_tipo, data) {
      const token = await auth.getToken;
      console.log("updateTD actions:", id_tipo, data);
      await api
        .put(`tipos-dispositivos/update/${id_tipo}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          createNotify(
            `Tipo Dispositivo ${response.data.id_rol} actualizado exitosamente!`,
            "positive"
          );
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data.errors[0].message, "negative");
          console.log("Error", error.response.data.message);
        });
      this.getAllRoles();
    },
    async deleteTD(id_tipo) {
      const token = await auth.getToken;
      await api
        .delete(`tipos-dispositivos/delete/${id_tipo}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          createNotify(
            `Tipo Dispositivo ${data} eliminado exitosamente!`,
            "positive"
          );
          this.roles = this.roles.filter((cli) => cli.id_tipo !== id_tipo);
          console.log("deleteTD ACTIONS: ", data);
        })
        .catch((error) => {
          console.log("deleteTD ACTIONS: ", error.response.data.message);
          createNotify(error.response.data.message, "negative");
          console.log("Error", error.response.data.message);
        });

      this.getAllTipoDispositivos();
    },
  },
});
