<script setup>
import { ref } from "vue";

//aca van los v-model de los input del formulario, sin esto no se mantiene el texto en el input (se borraba con clickear otro lado)

const idTicket = ref(null);
const cliente = ref(null);
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
</script>

<template>
  <div class="q-pa-lg" style="max-width: 700px">
    <h4 class="text-center">Crear Ticket (Órden Técnica)</h4>
    <q-card class="q-pa-md">
      <q-form @submit="procesarFormulario">
        <div class="row">
          <div class="col">
            <q-input
              v-model="idTicket"
              color="grey-3"
              label-color="primary"
              outlined
              label="ID Ticket"
              mask="#######"
              fill-mask
            >
              <template #append>
                <q-icon name="badge" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-select
              v-model="cliente"
              outlined
              :options="options"
              :dense="dense"
              :options-dense="denseOpts"
              label="Cliente Atendido"
            >
              <template #append>
                <q-icon name="event" color="black" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-select
              v-model="colaborador"
              outlined
              :options="options"
              :dense="dense"
              :options-dense="denseOpts"
              label="Colaborador que Atiende"
            >
              <template #append>
                <q-icon name="event" color="black" />
              </template>
            </q-select>
          </div>
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
