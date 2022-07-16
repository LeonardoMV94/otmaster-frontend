import { computed } from "vue";
import { useRolesStore } from "stores/roles";

const useRol = () => {
  const store = useRolesStore();

  const getAllRoles = async () => {
    await store.getAllRoles();
  };

  const getRolById = async (id_rol) => {
    await store.getRolById(id_rol);
  };

  const createRol = async (RolObj) => {
    console.log("createRol ", RolObj);
    await store.createRol(RolObj);
  };

  const updateRol = async (id_rol, updateDis) => {
    console.log("updateRol", id_rol, updateDis);
    await store.updateRol(id_rol, updateDis);
  };

  const deleteRol = async (id_rol) => {
    console.log("deleteRol useRol: ", id_rol);
    await store.deleteRol(id_rol);
  };

  return {
    getAllRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol,
    getRoles: computed(() => store.getRoles),
    getRol: computed(() => store.getRol),
  };
};

export default useRol;
