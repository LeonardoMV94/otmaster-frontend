<template>
  <div class="column">
    <div class="row justify-center">
      <h5 class="text-h4 text-white q-my-md">Iniciar Sesión</h5>
    </div>
    <div class="row">
      <q-card square bordered class="q-pa-xl shadow-1">
        <q-card-section>
          <q-form class="q-gutter-lg">
            <q-input
              v-model="userForm.rut"
              square
              outlined
              clearable
              type="text"
              label="Rut Colaborador"
            >
              <template #before>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              v-model="userForm.password"
              square
              outlined
              clearable
              type="password"
              label="Contraseña"
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
            @click="verify"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  setup() {
    const userForm = ref({
      rut: "",
      password: "",
    });

    const router = useRouter();

    return {
      userForm,
      verify: async () => {
        if (userForm.value.rut == "123") {
          console.log(true);
          //si accede redirecciona a home
          router.push({ name: "home" });
        }
      },
    };
  },
};
</script>

<style></style>
