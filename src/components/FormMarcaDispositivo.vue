<script setup>
import { ref } from "vue";
import useMarcaDispositivo from "src/composables/useMarcaDispositivo";
const { createMarcaDispositivo } = useMarcaDispositivo();

const nombreMarca = ref(null);

const procesarFormulario = () => {
  const marcaObj = {
    nombre_marca: nombreMarca.value,
  };
  console.log("Form nombreMarca: ", marcaObj);
  createMarcaDispositivo(marcaObj);
};
</script>

<template>
  <div style="width: 700px; max-width: 80vw">
    <q-card class="q-pa-md">
      <h4 class="text-center">Agregar Marca de Dispositivo</h4>
      <q-form @submit="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-input
              v-model="nombreMarca"
              label-color="primary"
              outlined
              label="Nombre Marca"
              mask="SSSSSSSSSSSSSSSSSSSS"
              unmasked-value
              :rules="[(val) => !!val || 'Se requiere que escriba una marca']"
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
