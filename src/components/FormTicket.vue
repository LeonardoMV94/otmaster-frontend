<script setup>
import { ref, onMounted } from "vue";
import useCliente from "../composables/useCliente";
import useColaborador from "../composables/useColaboradores";
const { getAllClientes, getOnlyRuts } = useCliente();
const { getAllColaboradores, getOnlyRutCol } = useColaborador();
onMounted(async () => {
  await getAllClientes();
  await getAllColaboradores();
});

const optionscli = getOnlyRuts.value;
const cliente = ref(null);

const optionscol = getOnlyRutCol.value;
const colaborador = ref(null);
const dispositivo = ref(null);
const problemaTicket = ref(null);
const resolucionTicket = ref(null);
const diagnosticoTicket = ref(null);

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

// filtros
// const filterFn = (val, update) => {
//   if (val === "") {
//     update(() => {
//       options.value = getOnlyRuts.value;
//     });
//     return;
//   }
//   update(() => {
//     options.value = getOnlyRuts.value.filter((rut) => rut.indexOf(val) > -1);
//   });
// };
</script>

<template>
  <div style="max-width: 700px">
    <q-card class="q-pa-sm">
      <h4 class="text-center">Crear Ticket (OT)</h4>
      <q-form @submit="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-select
              v-model="cliente"
              outlined
              use-input
              input-debounce="0"
              label="Elija un cliente"
              :options="optionscli"
              behavior="menu"
              @filter="filterFn"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay Clientes
                  </q-item-section>
                </q-item>
              </template>
              <template #append>
                <q-icon name="person" color="black" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-select
              v-model="colaborador"
              outlined
              use-input
              input-debounce="0"
              label="Colaborador que atiende"
              :options="optionscol"
              behavior="menu"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay colaboradores
                  </q-item-section>
                </q-item>
              </template>
              <template #append>
                <q-icon name="event" color="black" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-select
              v-model="dispositivo"
              outlined
              :options="options"
              :dense="dense"
              :options-dense="denseOpts"
              label="Dispositivo Atendido"
            >
              <template #append>
                <q-icon name="event" color="black" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="problemaTicket"
              label="Describa el problema..."
              type="textarea"
              outlined
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="diagnosticoTicket"
              label="Describa el diagnóstico..."
              type="textarea"
              outlined
            />
          </div>
        </div>
        <div class="row justify-center">
          <div class="col">
            <q-input
              v-model="resolucionTicket"
              label="Describa la resolución..."
              type="textarea"
              outlined
            />
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
