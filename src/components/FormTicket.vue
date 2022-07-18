<script setup>
import { ref, onBeforeMount, onActivated } from "vue";

import useCliente from "../composables/useCliente";
import useColaborador from "../composables/useColaboradores";
import useDispositivo from "../composables/useDispositivo";
import useTicket from "../composables/useTickets";

const { getAllClientes, getOnlyRuts } = useCliente();
const { getAllColaboradores, getOnlyRutCol } = useColaborador();
const { getAllDispositivos, getOnlyIdDispositivos } = useDispositivo();
const { createTicket } = useTicket();

// TODO:_ añadir useDispositivo con get by id u otro
//añadir popUp de edición de problema , diag y resol
onBeforeMount(async () => {
  await init();
});
onActivated(async () => {
  await init();
});

const init = async () => {
  await getAllClientes();
  await getAllColaboradores();
  await getAllDispositivos();
};
// solucion repuestos multiples, single multiple selections
// https://quasar.dev/vue-components/select

const optionscli = getOnlyRuts.value;
const rut_cliente = ref(null);

const optionscol = getOnlyRutCol.value;
const rut_colaborador = ref(null);

const id_dispositivo = ref(null);
const optionsdis = getOnlyIdDispositivos.value;
const problema_ticket = ref(null);
// const resolucion_ticket = ref(null);
// const diagnostico_ticket = ref(null);
const estado_ticket = ref(1);

//validaciones
const procesarFormulario = async () => {
  const createTicketObj = {
    clientesRutCliente: rut_cliente.value,
    colaboradoresRutColaborador: rut_colaborador.value,
    dispositivosIdDispositivo: id_dispositivo.value,
    problema_ticket: problema_ticket.value,
    estado_ticket: estado_ticket.value,
  };
  await createTicket(createTicketObj);
};

// filtros TODO: crear filtros
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
  <div style="width: 700px; max-width: 80vw">
    <q-card class="q-pa-sm">
      <h4 class="text-center">Crear Ticket (OT)</h4>
      <q-form @submit="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-select
              v-model="rut_cliente"
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
              v-model="rut_colaborador"
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
                <q-icon name="support_agent" color="black" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-select
              v-model="id_dispositivo"
              outlined
              use-input
              input-debounce="0"
              label="Dispositivo a reparar"
              :options="optionsdis"
              behavior="menu"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay dispositivos
                  </q-item-section>
                </q-item>
              </template>
              <template #append>
                <q-icon name="devices_other" color="black" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="problema_ticket"
              label="Describa el problema... *"
              type="textarea"
              outlined
            />
          </div>
        </div>
        <!-- <div class="row">
          <div class="col">
            <q-input
              v-model="diagnostico_ticket"
              label="Describa el diagnóstico..."
              type="textarea"
              outlined
            />
          </div>
        </div>
        <div class="row justify-center">
          <div class="col">
            <q-input
              v-model="resolucion_ticket"
              label="Describa la resolución..."
              type="textarea"
              outlined
            />
          </div>
        </div> -->
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
