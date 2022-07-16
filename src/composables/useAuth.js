import { computed } from "vue";
import { useAuthStore } from "stores/auth";

const useAuth = () => {
  const store = useAuthStore();

  const loginUser = async (user) => {
    console.log("useath composable -> loginUser: ", user !== null);
    const resp = await store.signInUser(user);
    return resp;
  };

  const checkAuthStatus = () => {
    const resp = store.checkAuthentication();
    return resp;
  };

  const logout = () => {
    store.logout();
  };

  return {
    checkAuthStatus,
    loginUser,
    logout,

    // authStatus: computed(() => store.getCurrentState),
    username: computed(() => store.getUserName),
    rol: computed(() => store.getRol),
  };
};

export default useAuth;
