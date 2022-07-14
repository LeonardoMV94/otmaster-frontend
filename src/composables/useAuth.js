import { computed } from "vue";
import { useAuthStore } from "stores/auth";

const useAuth = () => {
  const store = useAuthStore();

  const loginUser = async (user) => {
    const resp = await store.signInUser(user);
    return resp;
  };

  const checkAuthStatus = async () => {
    const resp = await store.checkAuthentication();
    return resp;
  };

  const logout = () => {
    store.logout();
  };

  return {
    checkAuthStatus,
    loginUser,
    logout,

    authStatus: computed(() => store.getCurrentState),
    username: computed(() => store.getUserName),
    user: computed(() => store.getUser),
    // authStatus: computed(() => store().getters.authStatus),
    // username: computed(() => store().getters.username),
  };
};

export default useAuth;
