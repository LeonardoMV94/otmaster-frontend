export const currentState = (state) => {
  return state.status;
};

export const username = (state) => {
  return state.user?.rut_colaborador || "Usuario";
};

export const getToken = (state) => {
  return state.idToken || localStorage.getItem("idToken");
};
