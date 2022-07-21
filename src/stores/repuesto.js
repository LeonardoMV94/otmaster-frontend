import { defineStore } from "pinia";
import { api } from "boot/axios";
import { createNotify } from "../utils/Notifications";
import { useAuthStore } from "./auth";

const auth = useAuthStore();

export const useRepuestosStore = defineStore("repuestos", {
  state: () => ({
    repuestos: [],
  }),
  getters: {
    getRepuestos: (state) => state.repuestos,
  },
  actions: {
    async getAllRepuestos() {
      const token = await auth.getToken;
      if (token == "") {
        return this.repuestos;
      }
      const { data } = await api.get("/repuestos/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("getAllMarcaDispositivos ACTIONS: ", data);
      this.repuestos = data;
    },
    async createRepuesto(data) {
      console.log("createRepuesto: ", data);
      const token = auth.getToken;
      await api
        .post("/repuestos/add/", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          createNotify(
            `Repuesto ${response.data.id_repuesto} creado exitosamente!`,
            "positive"
          );
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data.message, "negative");
          console.log("Error", error.response.data.message);
        });

      this.getAllRepuestos();
    },
    async updateRepuesto(id_repuesto, updateObj) {
      const token = auth.getToken;
      console.log("updateRepuesto actions:", id_repuesto, updateObj);
      await api
        .patch(`repuestos/${id_repuesto}`, updateObj, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          createNotify(
            `Repuesto ${response.data.id_repuesto} actualizado exitosamente!`,
            "positive"
          );
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data.errors[0].message, "negative");
          console.log("Error", error.response.data.message);
        });
      this.getAllRepuestos();
    },
    async deleteRepuesto(id_repuesto) {
      const token = auth.getToken;
      await api
        .delete(`repuestos/delete/${id_repuesto}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          createNotify(
            `Repuesto ${data.id_repuesto} eliminado exitosamente!`,
            "negative"
          );
          console.log("antes ", this.repuestos);
          this.repuestos = this.repuestos.filter(
            (ti) => ti.id_repuesto !== id_repuesto
          );
          console.log("despues", this.repuestos);
          console.log("deleteRepuesto ACTIONS: ", data);
        })
        .catch((error) => {
          console.log("deleteRepuesto ACTIONS: ", error.response.data.message);
          createNotify(error.response.data.message, "negative");
          console.log("Error", error.response.data.message);
        });
    },
  },
});
