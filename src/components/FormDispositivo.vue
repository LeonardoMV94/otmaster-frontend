<script setup>
import { ref, onActivated, onBeforeMount } from "vue";
import useMarcaDispositivo from "src/composables/useMarcaDispositivo";
import useTipoDispositivo from "src/composables/useTipoDispositivo";
import useDispositivo from "src/composables/useDispositivo";

const { getAllMarcaDispositivos, getMDtoSelect } = useMarcaDispositivo();
const { getAllTipoDispositivos, getTDtoSelects } = useTipoDispositivo();
const { createDispositivo } = useDispositivo();

const numeroSerieDispositivo = ref(null);
const modeloDispositivo = ref(null);
const marcaDispositivo = ref(null);
const tipoDispositivo = ref(null);

const md = getMDtoSelect.value;
const td = getTDtoSelects.value;

const procesarFormulario = () => {
  const disObj = {
    num_serie_dispositivo: numeroSerieDispositivo.value,
    modelo: modeloDispositivo.value,
    marcasDispositivosIdMarcas: marcaDispositivo.value,
    tiposDispositivosIdTipos: tipoDispositivo.value,
  };
  console.log("form dispositivos: ", disObj);
  createDispositivo(disObj);
};

const init = async () => {
  await getAllMarcaDispositivos();
  await getAllTipoDispositivos();
};
onActivated(async () => {
  await init();
});
onBeforeMount(async () => {
  await init();
});
</script>

<template>
  <div class="q-pa-lg" style="max-width: 700px">
    <q-card class="q-pa-md">
      <h4 class="text-center">Agregar un Dispositivo</h4>

      <q-form @submit="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-select
              v-model="tipoDispositivo"
              label-color="primary"
              outlined
              input-debounce="0"
              label="Tipo Dispositivo "
              map-options
              emit-value
              behavior="menu"
              :options="td"
              ><template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay tipos de dispositivos
                  </q-item-section>
                </q-item>
              </template>
              <template #append>
                <q-icon name="smartphone" color="black" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-select
              v-model="marcaDispositivo"
              color="grey-3"
              label-color="primary"
              outlined
              input-debounce="0"
              label="Marca Dispositivo "
              behavior="menu"
              map-options
              emit-value
              :options="md"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay marcas
                  </q-item-section>
                </q-item>
              </template>
              <template #append>
                <q-icon name="star" color="black" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="modeloDispositivo"
              color="grey-3"
              label-color="primary"
              outlined
              label="Modelo del dispositivo"
              unmasked-value
              clearable
              mask="NNNNNNNNNNNNNNNNNNNNNN"
              :rules="[(val) => !!val || 'Se requiere que escriba un modelo']"
            >
              <template #append>
                <q-icon name="tv" color="black" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="numeroSerieDispositivo"
              label-color="primary"
              outlined
              label="Número de Serie"
              mask="NNNNNNNNNNNNNNNNNNNNNNNNNN"
              unmasked-value
              clearable
              :rules="[
                (val) => !!val || 'Se requiere que escriba un numero de serie',
              ]"
            >
              <template #append>
                <q-icon name="tag" color="black" />
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
