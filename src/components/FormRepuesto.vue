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
  <div class="q-pa-xl" style="max-width: 700px">
    <h4 class="text-center">Administración de Repuestos</h4>
    <q-card class="q-pa-md">
      <q-form @submit="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-input
              v-model="repuesto"
              label-color="primary"
              outlined
              label="Nombre del Repuesto"
              lazy-rules
              :rules="[(val) => !!val || 'Se requiere que escriba un repuesto']"
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
