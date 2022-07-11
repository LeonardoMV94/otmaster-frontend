// import { computed } from "vue";
// import store from "../store";
import { useStore } from "vuex";

const useCliente = () => {
  const store = useStore();

  const getAllClientes = async () => {
    await store.dispatch("clientes/getAllClientes");
  };

  const getClienteById = async (rut_colaborador) => {
    await store.dispatch("clientes/getClienteById", rut_colaborador);
  };

  const createCliente = async (clienteObj) => {
    await store.dispatch("clientes/createCliente", clienteObj);
  };

  const updateCliente = async (rut_colaborador, updateCli) => {
    console.log("updateCliente useCLiente: ", rut_colaborador, updateCli);
    await store.dispatch("clientes/updateCliente", rut_colaborador, updateCli);
  };

  const deleteCliente = async (rut_colaborador) => {
    console.log("deleteCliente useCliente: ", rut_colaborador);
    await store.dispatch("clientes/deleteCliente", rut_colaborador);
  };

  return {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
    getClientes: store.getters["clientes/getClientes"],
  };
};

export default useCliente;
