<template>
  <div>
    <h1>Hola Mundo! pagina tickets</h1>

    <q-input
      v-model="nombreCliente"
      color="grey-3"
      label-color="primary"
      outlined
      label="Nombre del Cliente"
    />
  </div>
</template>

<script>
export default {
  name: "TicketsPage",
  setup() {
    return {};
  },
};
</script>

<style></style>
