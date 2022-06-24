<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    /> -->

    {{ clientes }}
    <!-- <q-table
      title="Clientes"
      :rows="rows"
      :columns="columns"
      row-key="name"
      dark
      color="amber"
    /> -->
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "boot/axios";
// import { useQuasar } from "quasar";

export default defineComponent({
  name: "IndexPage",
  setup() {
    // const $q = useQuasar();
    const clientes = ref(null);

    const loadData = () => {
      api
        .get("/clientes", {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExMjIyMzM4LCJyb2xlIjoxLCJpYXQiOjE2NTU4Mjk1OTh9.7yf8gREybtZ_-G7hovkEHAoC6AXh29JlyvRpRPVmSyk",
          },
        })
        .then((response) => {
          clientes.value = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    loadData();

    return {
      clientes,
    };
  },
});
</script>
