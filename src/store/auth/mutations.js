export const loginUser = (state, { user, token }) => {
  if (token) {
    localStorage.setItem("idToken", token);
    localStorage.setItem("user", user);
    state.idToken = token;
    state.user = user;
    state.status = "authenticated";
  }
};

export const logout = (state) => {
  state.user = null;
  state.idToken = null;
  state.status = "not-authenticated";
  localStorage.removeItem("idToken");
};
