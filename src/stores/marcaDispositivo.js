import { defineStore } from "pinia";
import { api } from "boot/axios";
import { createNotify } from "../utils/Notifications";
import { useAuthStore } from "./auth";

const auth = useAuthStore();

export const useMarcasDispositivosStore = defineStore("MarcasDispositivos", {
  state: () => ({
    marcasDispositivos: [],
    marcaDispositivo: {},
  }),
  getters: {
    getMarcasDispositivos: (state) => state.marcasDispositivos,
    getMarcaDispositivo: (state) => state.marcaDispositivo,
    getMDSelect: (state) =>
      state.marcasDispositivos.map((m) => ({
        ...m,
        label: m.nombre_marca,
        value: m.id_marca,
      })),
  },
  actions: {
    async getAllMarcaDispositivos() {
      const token = await auth.getToken;
      if (token == "") {
        return this.marcasDispositivos;
      }
      const { data } = await api.get("/marcas-dispositivos/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("getAllMarcaDispositivos ACTIONS: ", data);
      this.marcasDispositivos = data;
    },
    async getMarcaDispositivoById(id_marca) {
      const token = await auth.getToken;
      const { data } = await api.get(`/marcas-dispositivos/${id_marca}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      this.marcaDispositivo = data;
    },
    async createMarcasDispositivo(data) {
      const token = auth.getToken;
      await api
        .post("/marcas-dispositivos/add/", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          createNotify(
            `Marca Dispositivo ${response.data.id_marca} creado exitosamente!`,
            "positive"
          );
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data.errors[0].message, "negative");
          console.log("Error", error.response.data.message);
        });

      this.getAllMarcasDispositivos();
    },
    async updateMarcaDispositivo(id_tipo, data) {
      const token = await auth.getToken;
      console.log("updateMD actions:", id_tipo, data);
      await api
        .put(`marcas-dispositivos/update/${id_tipo}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          createNotify(
            `Tipo Dispositivo ${response.data.id_marca} actualizado exitosamente!`,
            "positive"
          );
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data.errors[0].message, "negative");
          console.log("Error", error.response.data.message);
        });
      this.getAllMarcaDispositivos();
    },
    async deleteMarcaDispositivo(id_marca) {
      const token = await auth.getToken;
      await api
        .delete(`marcas-dispositivos/delete/${id_marca}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          createNotify(
            `Tipo Dispositivo ${data} eliminado exitosamente!`,
            "positive"
          );
          this.roles = this.roles.filter((cli) => cli.id_marca !== id_marca);
          console.log("deleteMD ACTIONS: ", data);
        })
        .catch((error) => {
          console.log("deleteMD ACTIONS: ", error.response.data.message);
          createNotify(error.response.data.message, "negative");
          console.log("Error", error.response.data.message);
        });

      this.getAllMarcaDispositivos();
    },
  },
});
