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
    getToken: (state) => state.idToken,
    getUserName: (state) => state.username || "Colaborador",
    getRol: (state) => state.rol,
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
        console.log(token);
        if (token) {
          localStorage.setItem("OToken", token);
          localStorage.setItem("username", user.rut_colaborador);
          localStorage.setItem("rol", user.roles.nombre_rol);
          this.idToken = token;
          this.username = user.rut_colaborador;
          this.rol = user.roles.nombre_rol;
          console.log("token ? : ", this.getToken);
          this.user = user;
          return { ok: true };
        }
      } catch (error) {
        console.log("signInUser: ", "NO funciona");
        return { ok: false, message: error };
      }
    },
    checkAuthentication() {
      const atoken = this.getToken;

      console.log("token ", atoken, this.idToken);
      if (atoken) {
        console.log("funciona, si hay token");
        return { ok: true, message: "Si hay Token" };
      } else {
        //this.logout();
        return { ok: false, message: "No hay token" };
      }
    },
    logout() {
      this.user = null;
      this.idToken = null;
      localStorage.removeItem("OToken");
      localStorage.removeItem("username");
      localStorage.removeItem("rol");

      console.log("logout");
    },
  },
});
