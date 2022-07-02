import store from "../../store";
import { api } from "../../boot/axios";

export const getAllClientes = async ({ commit }) => {
  const token = store.getters["auth/getToken"];
  if (token == "") {
    commit("setClientes", []);
    return;
  }

  const { data } = await api.get("/clientes", {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("getAllClientes ACTIONS: ", data);
  commit("setClientes", data);
};

export const getClienteById = (rut_colaborador) => {
  const token = store.getters["auth/getToken"];
  const { data } = api.get(`/clientes/${rut_colaborador}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(data);
};

export const createCliente = (clienteObj) => {
  const token = store.getters["auth/getToken"];
  const { data } = api.post("/clientes/add", clienteObj, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(data);
};

export const updateCliente = (rut_colaborador, clienteObj) => {
  const token = store.getters["auth/getToken"];
  const { data } = api.patch(`clientes/update/${rut_colaborador}`, clienteObj, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(data);
};

export const deleteCliente = async (rut_colaborador) => {
  const token = store.getters["auth/getToken"];
  const { data } = api.delete(`clientes/delete/${rut_colaborador}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(data);
};
