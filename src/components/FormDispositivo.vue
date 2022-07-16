<script setup>
import { ref } from "vue";

//aca van los v-model de los input del formulario, sin esto no se mantiene el texto en el input (se borraba con clickear otro lado)

const idDispositivo = ref(null);
const numeroSerieDispositivo = ref(null);
const modeloDispositivo = ref(null);
const marcaDispositivo = ref(null);
const tipoDispositivo = ref(null);
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
      <h4 class="text-center">Agregar un Dispositivo</h4>

      <q-form @submit="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-input
              v-model="idDispositivo"
              color="grey-3"
              label-color="primary"
              outlined
              label="ID"
              mask="#######"
              fill-mask
            >
              <template #append>
                <q-icon name="badge" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="numeroSerieDispositivo"
              label-color="primary"
              outlined
              label="Número de Serie"
              mask="######"
              fill-mask
            >
              <template #append>
                <q-icon name="tag" color="black" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-select
              v-model="modeloDispositivo"
              color="grey-3"
              label-color="primary"
              outlined
              fill-mask
              label="Modelo Dispositivo"
              mask="SSSSSSSSSSSSSSSSSSSS"
            >
              <template #append>
                <q-icon name="tv" color="black" />
              </template>
            </q-select>
          </div>
          <div class="col">
            <q-select
              v-model="marcaDispositivo"
              color="grey-3"
              label-color="primary"
              outlined
              fill-mask
              label="Marca Dispositivo "
              mask="SSSSSSSSSSSSSSSSSSSS"
            >
              <template #append>
                <q-icon name="star" color="black" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-select
              v-model="tipoDispositivo"
              type="email"
              label-color="primary"
              outlined
              label="Tipo Dispositivo"
              mask="##########"
              fill-mask
            >
              <template #append>
                <q-icon name="smartphone" color="black" />
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
