<script setup>
import { ref } from "vue";

//aca van los v-model de los input del formulario, sin esto no se mantiene el texto en el input (se borraba con clickear otro lado)

const idColaborador = ref(null);
const nombreColaborador = ref(null);
const apPatColaborador = ref(null);
const apMatColaborador = ref(null);
const passColaborador = ref(null);
const rolColaborador = ref(null);
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
  <div class="q-pa-lg" style="max-width: 700px">
    <q-card class="q-pa-md">
      <h4 class="text-center">Agregar un Colaborador</h4>

      <q-form @submit="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-input
              v-model="idColaborador"
              color="grey-3"
              label-color="primary"
              outlined
              label="ID"
              mask="########"
              fill-mask
            >
              <template #append>
                <q-icon name="badge" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="nombreColaborador"
              label-color="primary"
              outlined
              label="Nombre del Colaborador"
              mask="SSSSSSSSSSSSSSSSSSSS"
              fill-mask
            >
              <template #append>
                <q-icon name="engineering" color="black" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="apPatColaborador"
              color="grey-3"
              label-color="primary"
              outlined
              fill-mask
              label="Apellido Paterno"
              mask="SSSSSSSSSSSSSSSSSSSS"
            >
              <template #append>
                <q-icon name="engineering" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="apMatColaborador"
              color="grey-3"
              label-color="primary"
              outlined
              fill-mask
              label="Apellido Materno"
              mask="SSSSSSSSSSSSSSSSSSSS"
            >
              <template #append>
                <q-icon name="engineering" color="black" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="passColaborador"
              type="password"
              label-color="primary"
              outlined
              label="Contraseña Colaborador"
            >
              <template #append>
                <q-icon name="lock" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-select
              v-model="rolColaborador"
              outlined
              label-color="primary"
              :options="options"
              :dense="dense"
              :options-dense="denseOpts"
              label="Tipo de Rol"
            >
              <template #append>
                <q-icon name="attribution" color="black" />
              </template>
            </q-select>
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
