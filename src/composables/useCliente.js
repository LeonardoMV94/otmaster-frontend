import { computed } from "vue";
// import store from "../store";
import { useClientesStore } from "stores/clientes";

const useCliente = () => {
  const store = useClientesStore();

  const getAllClientes = async () => {
    await store.getAllClientes();
  };

  // const getClienteById = async (rut_colaborador) => {
  //   await store.dispatch("clientes/getClienteById", rut_colaborador);
  // };

  // const createCliente = async (clienteObj) => {
  //   await store.dispatch("clientes/createCliente", clienteObj);
  // };

  // const updateCliente = async (rut_colaborador, updateCli) => {
  //   console.log("updateCliente useCLiente: ", rut_colaborador, updateCli);
  //   await store.dispatch("clientes/updateCliente", rut_colaborador, updateCli);
  // };

  // const deleteCliente = async (rut_colaborador) => {
  //   console.log("deleteCliente useCliente: ", rut_colaborador);
  //   await store.dispatch("clientes/deleteCliente", rut_colaborador);
  // };

  return {
    getAllClientes,
    // getClienteById,
    // createCliente,
    // updateCliente,
    // deleteCliente,
    getClientes: computed(() => store.getClientes),
    //getClientes: store.getClientes,
  };
};

export default useCliente;
