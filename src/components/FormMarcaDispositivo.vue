<script setup>
import { ref } from "vue";

//aca van los v-model de los input del formulario, sin esto no se mantiene el texto en el input (se borraba con clickear otro lado)

const idMarca = ref(null);
const nombreMarca = ref(null);
// alternativa a lo anterior
// const clienteObj = ref({
//   idCliente: 0,
//   nombreCliente: '',
//   apPatCliente: '',
//   apMatCliente: '',
//   correoCliente: '',
//   telCliente: '',
// })
// y se llama en los v-model como clienteObj.idCliente

//validaciones
const procesarFormulario = () => {
  console.log("Se envió prueba de formulario");
};
</script>

<template>
  <div class="q-pa-xl" style="max-width: 700px">
    <h4 class="text-center">Agregar Marca de Dispositivo</h4>
    <q-card class="q-pa-md">
      <q-form @submit="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-input
              v-model="idMarca"
              color="grey-3"
              label-color="primary"
              outlined
              label="ID"
              mask="##"
              fill-mask
            >
              <template #append>
                <q-icon name="badge" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="nombreMarca"
              label-color="primary"
              outlined
              label="Nombre Marca"
              mask="SSSSSSSSSSSSSSSSSSSS"
              fill-mask
            >
              <template #append>
                <q-icon name="star" color="black" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="row justify-center">
          <q-btn label="Agregar" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
