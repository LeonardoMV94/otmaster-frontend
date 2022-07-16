<script setup>
import { ref } from "vue";

//aca van los v-model de los input del formulario, sin esto no se mantiene el texto en el input (se borraba con clickear otro lado)

const idRol = ref(null);
const nombreRol = ref(null);
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
    <q-card class="q-pa-md">
      <h4 class="text-center">Administración de Roles</h4>

      <q-form @submit="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-input
              v-model="idRol"
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
              v-model="nombreRol"
              label-color="primary"
              outlined
              label="Nombre del Rol"
              mask="SSSSSSSSSSSSSSSSSSSS"
              fill-mask
            >
              <template #append>
                <q-icon name="attribution" color="black" />
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
