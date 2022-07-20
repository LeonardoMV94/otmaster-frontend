<script setup>
import { ref } from "vue";
import useRoles from "../composables/useRoles";

const { createRol } = useRoles();

const nombreRol = ref(null);
const procesarFormulario = () => {
  const rolObj = {
    nombre_rol: nombreRol.value,
  };
  console.log(rolObj);
  createRol(rolObj);
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
              v-model="nombreRol"
              label-color="primary"
              outlined
              label="Nombre del Rol"
              mask="SSSSSSSSSS"
              unmasked-value
              lazy-rules
              :rules="[(val) => !!val || 'Se requiere que escriba un rol']"
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
