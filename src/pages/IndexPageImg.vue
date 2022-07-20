<script setup>
import ot from "../assets/OT.png";
</script>

<template>
  <q-page padding>
    <div class="flex justify-center">
      <q-img
        :ratio="1"
        loading="lazy"
        :src="ot"
        spinner-color="blue"
        style="max-width: 500px"
      />
    </div>
  </q-page>
</template>
