export const setClientes = (state, clientes) => {
  state.clientes = clientes;
};

export const updateCliente = () => {
  // state.clientes = state.clientes.filter((cli) => cli.rut_cliente == rut);
};

export const deleteCliente = (state, rut) => {
  state.clientes = state.clientes.filter((cli) => cli.rut_cliente !== rut);
};

export const addCliente = () => {};
