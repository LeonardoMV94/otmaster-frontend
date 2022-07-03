import store from "../../store";
import { api } from "../../boot/axios";
import { Notify } from "quasar";

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

export const getClienteById = (state, rut_colaborador) => {
  const token = store.getters["auth/getToken"];
  const { data } = api.get(`/clientes/${rut_colaborador}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(data);
};

export const createCliente = async (state, data) => {
  const token = store.getters["auth/getToken"];
  console.log(data);
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
};

export const deleteCliente = async (rut_colaborador) => {
  const token = store.getters["auth/getToken"];
  api.delete(`clientes/delete/${rut_colaborador}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
