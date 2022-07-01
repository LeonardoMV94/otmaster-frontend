import { computed } from "vue";
// import { useStore } from "vuex";
import store from "../store";

const useAuth = () => {
  // const store = useStore();

  const loginUser = async (user) => {
    const resp = await store.dispatch("auth/signInUser", user);
    return resp;
  };

  const checkAuthStatus = async () => {
    const resp = await store.dispatch("auth/checkAuthentication");
    return resp;
  };

  const logout = () => {
    store.commit("auth/logout");
  };

  return {
    checkAuthStatus,
    loginUser,
    logout,

    authStatus: computed(() => store.getters["auth/currentState"]),
    username: computed(() => store.getters["auth/username"]),
    // authStatus: computed(() => store().getters.authStatus),
    // username: computed(() => store().getters.username),
  };
};

export default useAuth;
