export const loginUser = (state, { user, token }) => {
  console.log("llega al loginUser");
  if (token) {
    console.log("si hay token", state);
    localStorage.setItem("idToken", token);
    state.idToken = token;
    state.user = user;
    state.status = "authenticated";
    console.log("loginUser: ", state);
  }
};

export const logout = (state) => {
  state.user = null;
  state.idToken = null;
  state.status = "not-authenticated";

  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");
};
