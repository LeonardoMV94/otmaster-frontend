import { useAuthStore } from "stores/auth";
import pinia from "stores/store";
const store = useAuthStore(pinia);

const isAuthenticatedGuard = async (to, from, next) => {
  const { ok } = await store.checkAuthentication();
  console.log("REDIRECCIONADO isAuthenticatedGuard: ", ok);
  if (ok) next();
  else next({ name: "login" });
};

export default isAuthenticatedGuard;
