import store from "../";
import { api } from "../../boot/axios";
import { Notify } from "quasar";

export const getAllClientes = async () => {
  const token = store.getters["auth/getToken"];
  if (token == "") {
    store.state.clientes = [];
    return;
  }

  const { data } = await api.get("/clientes", {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("getAllClientes ACTIONS: ", data);
  store.state.clientes = data;
};

export const getClienteById = async (state, rut_colaborador) => {
  const token = store.getters["auth/getToken"];
  const { data } = await api.get(`/clientes/${rut_colaborador}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(data);
};

export const createCliente = async (state, data) => {
  const token = store.getters["auth/getToken"];
  await api
    .post("/clientes/add/", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      Notify.create({
        message: `Cliente ${response.data.rut_cliente} creado exitosamente!`,
        type: "positive",
        actions: [
          {
            label: "Cerrar",
            color: "white",
          },
        ],
      });
      console.log(response);
    })
    .catch((error) => {
      Notify.create({
        message: error.response.data.errors[0].message,
        type: "negative",
        actions: [
          {
            label: "Cerrar",
            color: "white",
          },
        ],
      });
      console.log("Error", error.response.data.message);
    });

  getAllClientes();
};

export const updateCliente = async (state, payload) => {
  const token = store.getters["auth/getToken"];
  console.log("updateCliente actions:", payload);
  const data = payload.data;
  const rut_colaborador = payload.id;
  await api
    .put(`clientes/update/${rut_colaborador}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      Notify.create({
        message: `Cliente ${response.data.rut_cliente} actualizado exitosamente!`,
        type: "positive",
        actions: [
          {
            label: "Cerrar",
            color: "white",
          },
        ],
      });
      console.log(response);
    })
    .catch((error) => {
      Notify.create({
        message: error.response.data.errors[0].message,
        type: "negative",
        actions: [
          {
            label: "Cerrar",
            color: "white",
          },
        ],
      });
      console.log("Error", error.response.data.message);
    });
  //commit("updateCliente", rut_colaborador)
  getAllClientes();
};

export const deleteCliente = async ({ commit }, rut_colaborador) => {
  const token = store.getters["auth/getToken"];
  await api
    .delete(`clientes/delete/${rut_colaborador}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => {
      Notify.create({
        message: `Cliente ${data} eliminado exitosamente!`,
        type: "negative",
        caption: "Cuidado al eliminar!",
        progress: true,
        actions: [
          {
            label: "Cerrar",
            color: "white",
          },
        ],
      });
      commit("deleteCliente", rut_colaborador);
      console.log("deleteCliente ACTIONS: ", data);
    })
    .catch((error) => {
      console.log("deleteCLiente ACTIONS: ", error.response.data.message);
      Notify.create({
        message: error.response.data.message,
        type: "negative",
        actions: [
          {
            label: "Cerrar",
            color: "white",
          },
        ],
      });
      console.log("Error", error.response.data.message);
    });

  getAllClientes();
};
