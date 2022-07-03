// import { computed } from 'vue'
import store from "../store";
import { api } from "../boot/axios";

const useCliente = () => {
  const token = store.getters["auth/getToken"];

  const getAllClientes = async () => {
    // return api
    //   .get("/clientes", { headers: { Authorization: `Bearer ${token}` } })
    //   .then((response) => {
    //     return response;
    //   })
    //   .catch((error) => {
    //     return { message: error.message };
    //   });
    await store.dispatch("clientes/getAllClientes");
    return store.getters["clientes/getClientes"];
  };

  const getClienteById = (rut_colaborador) => {
    api
      .get(`/clientes/${rut_colaborador}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return {
          message: error.message,
        };
      });
  };

  const createCliente = async (clienteObj) => {
    await store.dispatch("clientes/createCliente", clienteObj);
  };

  const updateCliente = async (rut_colaborador, updateCli) => {
    console.log("updateCliente useCLiente: ", rut_colaborador, updateCli);
    await store.dispatch("clientes/updateCliente", rut_colaborador, updateCli);
  };

  const deleteCliente = async (rut_colaborador) => {
    await api
      .delete(`clientes/delete/${rut_colaborador}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { message: error.message };
      });
  };

  return {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
  };
};

export default useCliente;
