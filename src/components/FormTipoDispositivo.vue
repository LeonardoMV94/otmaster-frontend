<script setup>
import { ref } from "vue";
import useTipoDispositivo from "src/composables/useTipoDispositivo";
const tipoDispositivo = ref(null);

const { createTipoDispositivo } = useTipoDispositivo();

const procesarFormulario = () => {
  const tdObj = {
    nombre_tipo: tipoDispositivo.value,
  };
  console.log("nuevo tipo dispositivo: ", tdObj);
  createTipoDispositivo(tdObj);
};
</script>

<template>
  <div class="q-pa-xl" style="max-width: 700px">
    <h4 class="text-center">Agregar un tipo de dispositivo</h4>
    <q-card class="q-pa-md">
      <q-form @submit="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-input
              v-model="tipoDispositivo"
              label-color="primary"
              outlined
              label="Tipo Dispositivo"
              mask="SSSSSSSSSSSSSSSSSSSS"
              unmasked-value
              :rules="[
                (val) =>
                  !!val || 'Se requiere que escriba un tipo de dispositivo',
              ]"
            >
              <template #append>
                <q-icon name="devices_other" color="black" />
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
