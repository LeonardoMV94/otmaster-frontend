import { defineStore } from "pinia";
import { authApi } from "../boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    status: "authenticating", // authenticated, not-authenticated, authtenticating
    user: null,
    idToken: null,
  }),
  getters: {
    getToken: (state) => state.idToken || localStorage.getItem("idToken"),
    getUser: (state) => state.user || localStorage.getItem("user"),
    getUserName: (state) => state.user?.rut_colaborador || "Colaborador",
    getCurrentState: (state) => state.status,
  },
  actions: {
    async signInUser(user) {
      const { rut_colaborador, password_colaborador } = user;

      try {
        const { data } = await authApi.post("/login", {
          rut_colaborador,
          password_colaborador,
        });
        const { user, token } = data;

        if (token) {
          localStorage.setItem("idToken", token);
          localStorage.setItem("user", user);
          this.idToken = token;
          this.user = user;
          this.status = "authenticated";
        }
        return { ok: true };
      } catch (error) {
        console.log("signInUser: ", "NO funciona");
        return { ok: false, message: error };
      }
    },
    async checkAuthentication() {
      const idToken = this.getToken;

      if (!idToken) {
        this.logout();
        return { ok: false, message: "No hay token" };
      } else {
        console.log("funciona, si hay token");
        return { ok: true, message: "Si hay Token" };
      }
    },
    logout() {
      this.user = null;
      this.idToken = null;
      this.status = "not-authenticated";
      localStorage.removeItem("idToken");
      console.log("logout");
    },
  },
});
