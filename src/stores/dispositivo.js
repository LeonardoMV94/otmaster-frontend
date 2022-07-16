import { defineStore } from "pinia";
import { api } from "boot/axios";
import { createNotify } from "../utils/Notifications";
import { useAuthStore } from "./auth";

const auth = useAuthStore();

export const useDispositivosStore = defineStore("Dispositivos", {
  state: () => ({
    dispositivos: [],
    dispositivo: {},
  }),
  getters: {
    getDispositivos: (state) => state.dispositivos,
    getDispositivo: (state) => state.dispositivo,
  },
  actions: {
    async getAllDispositivos() {
      const token = await auth.getToken;
      if (token == "") {
        return this.dispositivos;
      }
      const { data } = await api.get("/dispositivos/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("getAllDispositivos ACTIONS: ", data);
      this.dispositivos = data;
    },
    async getTDById(id_dispositivo) {
      const token = await auth.getToken;
      const { data } = await api.get(`/dispositivos/${id_dispositivo}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      this.dispositivo = data;
    },
    async createDispositivo(data) {
      const token = await auth.getToken;
      await api
        .post("/dispositivos/add/", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          createNotify(
            `Dispositivo ${response.data.id_dispositivo} creado exitosamente!`,
            "positive"
          );
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data.errors[0].message, "negative");
          console.log("Error", error.response.data.message);
        });

      this.getAllDispositivos();
    },
    async updateDispositivo(id_dispositivo, data) {
      const token = await auth.getToken;
      console.log("updateDispositivo actions:", id_dispositivo, data);
      await api
        .put(`dispositivos/update/${id_dispositivo}`, data, {
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
      this.getAllDispositivos();
    },
    async deleteDispositivo(id_dispositivo) {
      const token = await auth.getToken;
      await api
        .delete(`dispositivos/delete/${id_dispositivo}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          createNotify(
            `Tipo Dispositivo ${data} eliminado exitosamente!`,
            "positive"
          );
          this.roles = this.roles.filter(
            (cli) => cli.id_dispositivo !== id_dispositivo
          );
          console.log("deleteDispositivo ACTIONS: ", data);
        })
        .catch((error) => {
          console.log(
            "deleteDispositivo ACTIONS: ",
            error.response.data.message
          );
          createNotify(error.response.data.message, "negative");
          console.log("Error", error.response.data.message);
        });

      this.getAllDispositivos();
    },
  },
});
