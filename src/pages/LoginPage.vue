<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

import useAuth from "../composables/useAuth";
import useCliente from "../composables/useCliente";
// import { validate } from "rut.js";

const userForm = ref({
  rut_colaborador: "",
  password_colaborador: "",
});

const router = useRouter();
const { loginUser } = useAuth();
const { getAllClientes } = useCliente();
const $q = useQuasar();

const onSubmit = async () => {
  const { ok, message } = await loginUser(userForm.value);
  if (!ok) {
    $q.notify({ type: "negative", message: message });
  } else {
    getAllClientes();
    $q.notify({ type: "positive", message: message });
    router.push({ name: "home" });
  }
};
// verify: async () => {
//   if (userForm.value.rut_colaborador == "123") {
//     console.log(true);
//     //si accede redirecciona a home
//     router.push({ name: "home" });
//   }
// },
// const isValidRut = (val) => {
//   return validate(val) || "Rut no valido";
// }
</script>

<template>
  <div class="column col-md-4 col-sm-6">
    <div class="row justify-center">
      <h5 class="text-h4 text-white q-my-md">Iniciar Sesión</h5>
    </div>
    <div class="col-6">
      <q-card square bordered class="q-pa-xl shadow-1">
        <q-card-section>
          <q-form class="">
            <q-input
              v-model="userForm.rut_colaborador"
              square
              outlined
              clearable
              type="text"
              label="Rut Colaborador"
              lazy-rules
              :rules="[
                (val) => val.length > 0 || 'Este campo es obligatorio',
                // (val) => isValidRut(val),
              ]"
            >
              <template #before>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              v-model="userForm.password_colaborador"
              square
              outlined
              clearable
              type="password"
              label="Contraseña"
              lazy-rules
              :rules="[
                (val) => val.length > 0 || 'Este campo es obligatorio',
                (val) =>
                  val.length > 7 || 'Debe tener como minimo 8 carácteres',
              ]"
            >
              <template #before>
                <q-icon name="key" />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            unelevated
            color="light-blue-7"
            size="lg"
            class="full-width"
            label="Entrar"
            @click="onSubmit"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<style></style>
