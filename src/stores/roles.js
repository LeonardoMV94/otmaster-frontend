import { defineStore } from "pinia";
import { api } from "boot/axios";
import { createNotify } from "../utils/Notifications";
import { useAuthStore } from "./auth";

const auth = useAuthStore();

export const useRolesStore = defineStore("roles", {
  state: () => ({
    roles: [],
    rol: {},
  }),
  getters: {
    getRoles: (state) => state.roles,
    getRol: (state) => state.rol,
  },
  actions: {
    async getAllRoles() {
      const token = await auth.getToken;
      if (token == "") {
        return this.Roles;
      }

      const { data } = await api.get("/roles", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("getAllRoles ACTIONS: ", data);
      this.Roles = data;
    },
    async getRolById(id_rol) {
      const token = await auth.getToken;
      const { data } = await api.get(`/roles/${id_rol}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      this.rol = data;
    },
    async createRol(data) {
      const token = auth.getToken;
      await api
        .post("/roles/add/", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          createNotify(
            `Rol ${response.data.id_rol} creado exitosamente!`,
            "positive"
          );
          // Notify.create({
          //   message: `Rol ${response.data.id_rol} creado exitosamente!`,
          //   type: "positive",
          //   actions: [
          //     {
          //       label: "Cerrar",
          //       color: "white",
          //     },
          //   ],
          // });
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data.errors[0].message, "negative");
          // Notify.create({
          //   message: error.response.data.errors[0].message,
          //   type: "negative",
          //   actions: [
          //     {
          //       label: "Cerrar",
          //       color: "white",
          //     },
          //   ],
          // });
          console.log("Error", error.response.data.message);
        });

      this.getAllRoles();
    },
    async updateRol(id_rol, data) {
      const token = await auth.getToken;
      console.log("updateRol actions:", id_rol, data);
      await api
        .put(`roles/update/${id_rol}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          createNotify(
            `Rol ${response.data.id_rol} actualizado exitosamente!`,
            "positive"
          );
          // Notify.create({
          //   message: `Rol ${response.data.id_rol} actualizado exitosamente!`,
          //   type: "positive",
          //   actions: [
          //     {
          //       label: "Cerrar",
          //       color: "white",
          //     },
          //   ],
          // });
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data.errors[0].message, "negative");
          // Notify.create({
          //   message: error.response.data.errors[0].message,
          //   type: "negative",
          //   actions: [
          //     {
          //       label: "Cerrar",
          //       color: "white",
          //     },
          //   ],
          // });
          console.log("Error", error.response.data.message);
        });
      this.getAllRoles();
    },
    async deleteRol(id_rol) {
      const token = await auth.getToken;
      await api
        .delete(`roles/delete/${id_rol}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          createNotify(`Rol ${data} eliminado exitosamente!`, "positive");
          // Notify.create({
          //   message: `Rol ${data} eliminado exitosamente!`,
          //   type: "negative",
          //   caption: "Cuidado al eliminar!",
          //   progress: true,
          //   actions: [
          //     {
          //       label: "Cerrar",
          //       color: "white",
          //     },
          //   ],
          // });
          this.roles = this.roles.filter((cli) => cli.id_rol !== id_rol);
          console.log("deleteRol ACTIONS: ", data);
        })
        .catch((error) => {
          console.log("deleteRol ACTIONS: ", error.response.data.message);
          createNotify(error.response.data.message, "negative");
          // Notify.create({
          //   message: error.response.data.message,
          //   type: "negative",
          //   actions: [
          //     {
          //       label: "Cerrar",
          //       color: "white",
          //     },
          //   ],
          // });
          console.log("Error", error.response.data.message);
        });

      this.getAllRoles();
    },
  },
});
