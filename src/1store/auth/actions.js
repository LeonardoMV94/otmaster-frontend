import { authApi } from "src/boot/axios";

export const signInUser = async ({ commit }, user) => {
  const { rut_colaborador, password_colaborador } = user;

  try {
    const { data } = await authApi.post("/login", {
      rut_colaborador,
      password_colaborador,
    });
    const { user, token } = data;
    // console.log("signInUser: ", "funciona", user, token);
    commit("loginUser", { user, token });
    return { ok: true };
  } catch (error) {
    console.log("signInUser: ", "NO funciona");
    return { ok: false, message: error };
  }
};

export const checkAuthentication = async ({ commit }) => {
  const idToken = localStorage.getItem("idToken");

  if (!idToken) {
    commit("logout");
    console.log("logout");
    return { ok: false, message: "No hay token" };
  } else {
    console.log("funciona, si hay token");
    return { ok: true, message: "Si hay Token" };
  }
};
