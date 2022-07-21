<script setup>
import { ref } from "vue";
import useRepuestos from "../composables/useRepuestos";

const repuesto = ref(null);
const { createNewRepuesto } = useRepuestos();

const procesarFormulario = () => {
  console.log("Se envió prueba de formulario");
  const rep = {
    repuesto: repuesto.value,
  };
  createNewRepuesto(rep);
};
</script>

<template>
  <div style="width: 700px; max-width: 80vw">
    <q-card class="q-pa-md">
      <h4 class="text-center">Administración de Repuestos</h4>
      <q-form @submit="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-input
              v-model="repuesto"
              label-color="primary"
              outlined
              label="Nombre del Repuesto"
              lazy-rules
              counter
              clearable
              :rules="[
                (val) => !!val || 'Se requiere que escriba un repuesto',
                (val) => val.length <= 25 || `Máximo 25 carácteres`,
                (val) => val.length >= 4 || `Mínimo 4 carácteres`,
              ]"
            >
              <template #append>
                <q-icon name="build_circle" color="black" />
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
