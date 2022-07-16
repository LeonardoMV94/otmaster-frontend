import { defineStore } from "pinia";
import { authApi } from "../boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // status: "authenticating", // authenticated, not-authenticated, authtenticating
    idToken: null || localStorage.getItem("OToken"),
    username: null || localStorage.getItem("username"),
    rol: null || localStorage.getItem("rol"),
  }),

  getters: {
    getToken: (state) => state.idToken || localStorage.getItem("OToken"),
    getUserName: (state) => state.username || "Colaborador",
    getRol: (state) => state.rol || localStorage.getItem("rol"),
    //getCurrentState: (state) => state.status,
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
        console.log("Stores Auth -> signInUser: ", token !== null);
        if (token) {
          localStorage.setItem("OToken", token);
          localStorage.setItem("username", user.rut_colaborador);
          localStorage.setItem("rol", user.roles.nombre_rol);
          this.idToken = token;
          this.username = user.rut_colaborador;
          this.rol = user.roles.nombre_rol;
          console.log("token ? : ", this.getToken !== null);
          this.user = user;
          return { ok: true };
        }
      } catch ({ response }) {
        console.log("signInUser error: ", response.data.message);
        return { ok: false, message: response.data.message };
      }
    },
    async checkAuthentication() {
      const atoken = await this.getToken;
      console.log(
        "Stores Auth -> checkAuthentication() atoken: ",
        atoken !== null
      );
      if (atoken) {
        return { ok: true, message: "Si hay Token" };
      } else {
        this.logout();
        return { ok: false, message: "No hay token" };
      }
    },
    logout() {
      this.idToken = null;
      this.username = null;
      this.rol = null;
      localStorage.removeItem("OToken");
      localStorage.removeItem("username");
      localStorage.removeItem("rol");

      console.log("logout");
    },
  },
});
