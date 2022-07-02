<script setup>
import { ref } from "vue";

const cliente = ref(["HOla soy un cliente"]);
</script>

<template>
  <div>
    {{ cliente }}
  </div>
</template>
