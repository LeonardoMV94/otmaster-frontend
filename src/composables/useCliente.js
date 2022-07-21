import { computed } from "vue";
// import store from "../store";
import { useClientesStore } from "stores/clientes";

const useCliente = () => {
  const store = useClientesStore();

  const getAllClientes = async () => {
    await store.getAllClientes();
  };

  const getClienteById = async (rut_colaborador) => {
    await store.getClienteById(rut_colaborador);
  };

  const createCliente = async (clienteObj) => {
    console.log("createCliente useCliente: ", clienteObj);
    await store.createCliente(clienteObj);
  };

  const updateCliente = async (rut_colaborador, updateCli) => {
    console.log("updateCliente useCliente: ", rut_colaborador, updateCli);
    await store.updateCliente(rut_colaborador, updateCli);
  };

  const deleteCliente = async (rut_colaborador) => {
    console.log("deleteCliente useCliente: ", rut_colaborador);
    await store.deleteCliente(rut_colaborador);
  };

  const getClienteByRut = (rut) => {
    return store.getClientes.find((c) => c.rut_cliente == rut);
  };

  return {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
    getClienteByRut,
    getClientes: computed(() => store.getClientes),
    getOnlyRuts: computed(() => store.getOnlyRuts),
    getClientesSelect: computed(() => store.getClientesSelect),
  };
};

export default useCliente;
