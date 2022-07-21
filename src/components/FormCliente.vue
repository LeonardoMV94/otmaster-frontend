<script setup>
import { ref } from "vue";
import useCliente from "src/composables/useCliente";

const { createCliente } = useCliente();

const rutCliente = ref(null);
const nombreCliente = ref(null);
const apPatCliente = ref(null);
const apMatCliente = ref(null);
const correoCliente = ref(null);
const telCliente = ref(null);

const procesarFormulario = () => {
  const cliObj = {
    rut_cliente: rutCliente.value,
    nombre_cliente: nombreCliente.value,
    apmat_cliente: apMatCliente.value,
    appat_cliente: apPatCliente.value,
    correo_cliente: correoCliente.value,
    tel_cliente: telCliente.value,
  };
  console.log("FormCliente: ", cliObj);
  createCliente(cliObj);
};
const isValidEmail = (mail) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(mail) || "Email inválido";
};
</script>

<template>
  <div style="width: 700px; max-width: 80vw">
    <q-card class="q-pa-md">
      <h4 class="text-center">Agregar un Cliente</h4>

      <q-form @submit.prevent="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-input
              v-model.number="rutCliente"
              color="grey-3"
              label-color="primary"
              outlined
              label="Rut Cliente"
              clearable
              mask="########"
              unmasked-value
              :rules="[(val) => !!val || 'Ingrese un rut']"
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
              unmasked-value
              clearable
              :rules="[(val) => !!val > 0 || 'Ingresa un nombre.']"
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
              label="Apellido Paterno"
              mask="SSSSSSSSSSSSSSSSSSSS"
              unmasked-value
              clearable
              :rules="[(val) => !!val > 0 || 'Ingresa un apellido.']"
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
              label="Apellido Materno"
              mask="SSSSSSSSSSSSSSSSSSSS"
              unmasked-value
              clearable
              :rules="[(val) => !!val > 0 || 'Ingresa un apellido.']"
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
              mask="AAAAAAAAAAAAAAAAAAAAAAA"
              unmasked-value
              clearble
              :rules="[
                (val) => !!val > 0 || 'Ingresa un email.',
                (val) => isValidEmail(val),
              ]"
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
              label="Número Celular de cliente"
              mask="(#) ########"
              fill-mask
              :rules="[(val) => !!val > 0 || 'Ingresa un celular.']"
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
