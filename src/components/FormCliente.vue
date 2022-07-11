<script setup>
import { ref } from "vue";

//aca van los v-model de los input del formulario, sin esto no se mantiene el texto en el input (se borraba con clickear otro lado)

const idCliente = ref(null);
const nombreCliente = ref(null);
const apPatCliente = ref(null);
const apMatCliente = ref(null);
const correoCliente = ref(null);
const telCliente = ref(null);
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
  <div class="q-pa-md" style="max-width: 700px">
    <q-card class="q-pa-sm">
      <h4 class="text-center">Agregar un Cliente</h4>

      <q-form @submit.prevent="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-input
              ref="validadorIdCliente"
              v-model="idCliente"
              color="grey-3"
              label-color="primary"
              outlined
              label="ID"
              mask="########"
              fill-mask
              :rules="[(val) => (val && val.length < 1) || 'Ingresa un ID.']"
            >
              <template #append>
                <q-icon name="badge" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="nombreCliente"
              label-color="primary"
              outlined
              label="Nombre del Cliente"
              mask="SSSSSSSSSSSSSSSSSSSS"
              fill-mask
              :rules="[
                (val) => (val && val.length > 0) || 'Ingresa un nombre.',
              ]"
            >
              <template #append>
                <q-icon name="perm_identity" color="black" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="apPatCliente"
              color="grey-3"
              label-color="primary"
              outlined
              fill-mask
              label="Apellido Paterno"
              mask="SSSSSSSSSSSSSSSSSSSS"
            >
              <template #append>
                <q-icon name="perm_identity" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="apMatCliente"
              color="grey-3"
              label-color="primary"
              outlined
              fill-mask
              label="Apellido Materno"
              mask="SSSSSSSSSSSSSSSSSSSS"
            >
              <template #append>
                <q-icon name="perm_identity" color="black" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="correoCliente"
              type="email"
              label-color="primary"
              outlined
              label="E-mail"
              mask="##########"
              fill-mask
            >
              <template #append>
                <q-icon name="email" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-input
              v-model="telCliente"
              color="grey-3"
              label-color="primary"
              outlined
              label="Teléfono"
              mask="(#) ########"
              fill-mask
            >
              <template #append>
                <q-icon name="phone" color="black" />
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
