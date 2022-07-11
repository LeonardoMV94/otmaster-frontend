<script setup>
import { ref } from "vue";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";

const verified = ref(false);
const expired = ref(false);
const token = ref("");
const eKey = ref("");
const error = ref("");
// const invisibleHcaptcha = ref(null);

function onVerify(tokenStr, ekey) {
  verified.value = true;
  token.value = tokenStr;
  eKey.value = ekey;
  console.log(`Callback token: ${tokenStr}, ekey: ${ekey}`);
}
function onExpire() {
  verified.value = false;
  token.value = null;
  eKey.value = null;
  expired.value = true;
  console.log("Expired");
}
function onChallengeExpire() {
  verified.value = false;
  token.value = null;
  eKey.value = null;
  expired.value = true;
  console.log("Challenge expired");
}
function onError(err) {
  token.value = null;
  eKey.value = null;
  error.value = err;
  console.log(`Error: ${err}`);
}
// function onSubmit() {
//   console.log("Submitting the invisible hCaptcha");
//   invisibleHcaptcha.value.execute();
// }
</script>

<template>
  <vue-hcaptcha
    language="es"
    sitekey="10000000-ffff-ffff-ffff-000000000001"
    @verify="onVerify"
    @expired="onExpire"
    @challenge-expired="onChallengeExpire"
    @error="onError"
  >
  </vue-hcaptcha>
</template>
