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
    getRolesSelect: (state) =>
      state.roles.map((r) => ({
        ...r,
        label: r.nombre_rol,
        value: r.id_rol,
      })),
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
      this.roles = data;
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
          console.log(response);
        })
        .catch((error) => {
          createNotify(error.response.data.errors[0].message, "negative");
          console.log("Error", error.response.data.message);
        });

      this.getAllRoles();
    },
    async updateRol(id_rol, data) {
      const token = await auth.getToken;
      console.log("updateRol actions:", id_rol, data);
      await api
        .patch(`roles/${id_rol}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          createNotify(
            `Rol ${response.data.id_rol} actualizado exitosamente!`,
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
    async deleteRol(id_rol) {
      const token = await auth.getToken;
      if (id_rol == 1) {
        createNotify("Rol administrador no se puede eliminar !!", "negative");
        return;
      }
      await api
        .delete(`roles/delete/${id_rol}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          createNotify(`Rol ${data} eliminado exitosamente!`, "positive");
          this.roles = this.roles.filter((cli) => cli.id_rol !== id_rol);
          console.log("deleteRol ACTIONS: ", data);
        })
        .catch((error) => {
          console.log("deleteRol ACTIONS: ", error.response.data.message);
          createNotify(error.response.data.message, "negative");
          console.log("Error", error.response.data.message);
        });

      this.getAllRoles();
    },
  },
});
