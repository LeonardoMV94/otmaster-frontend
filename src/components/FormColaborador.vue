<script setup>
import { ref, onBeforeMount, onActivated } from "vue";
import useRol from "src/composables/useRoles";
import useColaborador from "src/composables/useColaboradores";

const { getAllRoles, getRolestoSelect, getRoles } = useRol();
const { createColaborador } = useColaborador();

const rutColaborador = ref(null);
const nombreColaborador = ref(null);
const apPatColaborador = ref(null);
const apMatColaborador = ref(null);
const passColaborador = ref(null);
const rolColaborador = ref(null);

const isPwd = ref(true);
const options = getRolestoSelect.value;
console.log("dispositivos getRolesSelect: ", options, getRoles.value);

const procesarFormulario = () => {
  const colObj = {
    rut_colaborador: rutColaborador.value,
    password_colaborador: passColaborador.value,
    nombre_colaborador: nombreColaborador.value,
    apmat_colaborador: apMatColaborador.value,
    appat_colaborador: apPatColaborador.value,
    rolesIdRol: rolColaborador.value,
  };
  console.log("FormColab: ", colObj);
  createColaborador(colObj);
};

onBeforeMount(async () => {
  await getAllRoles();
});
onActivated(async () => {
  await getAllRoles();
});
</script>

<template>
  <div class="q-pa-lg" style="max-width: 700px">
    <q-card class="q-pa-md">
      <h4 class="text-center">Agregar un Colaborador</h4>

      <q-form @submit="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-input
              v-model.number="rutColaborador"
              label-color="primary"
              outlined
              label="Rut del Colaborador"
              mask="########"
              unmasked-value
              clearable
              :rules="[(val) => !!val || 'Se requiere un rut']"
            >
              <template #append>
                <q-icon name="badge" color="black" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="nombreColaborador"
              label-color="primary"
              outlined
              label="Nombre del Colaborador"
              mask="SSSSSSSSSSSSSSSSSSSS"
              unmasked-value
              clearable
              :rules="[(val) => !!val || 'Se requiere que escriba un nombre']"
            >
              <template #append>
                <q-icon name="engineering" color="black" />
              </template>
            </q-input>
          </div>

          <div class="col">
            <q-input
              v-model="apPatColaborador"
              color="grey-3"
              label-color="primary"
              outlined
              label="Apellido Paterno"
              mask="SSSSSSSSSSSSSSSSSSSS"
              unmasked-value
              clearable
              :rules="[(val) => !!val || 'Se requiere que escriba un apellido']"
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
              v-model="apMatColaborador"
              color="grey-3"
              label-color="primary"
              outlined
              label="Apellido Materno"
              mask="SSSSSSSSSSSSSSSSSSSS"
              unmasked-value
              clearable
              :rules="[(val) => !!val || 'Se requiere que escriba un apellido']"
            >
              <template #append>
                <q-icon name="engineering" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-select
              v-model="rolColaborador"
              label-color="primary"
              outlined
              input-debounce="0"
              label="Rol Colaborador "
              map-options
              emit-value
              behavior="menu"
              :options="options"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay roles
                  </q-item-section>
                </q-item>
              </template>
              <template #append>
                <q-icon name="attribution" color="black" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="passColaborador"
              outlined
              label-color="primary"
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña Colaborador"
              clearable
              :rules="[
                (val) => !!val || 'Se requiere que escriba una contraseña',
              ]"
            >
              <template #append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <!-- <q-input
              v-model="passColaborador"
              type="password"
              label-color="primary"
              outlined
              label="Contraseña Colaborador"
              clearable
              :rules="[
                (val) => !!val || 'Se requiere que escriba una contraseña',
              ]"
            >
              <template #append>
                <q-icon name="lock" color="black" />
              </template>
            </q-input> -->
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
