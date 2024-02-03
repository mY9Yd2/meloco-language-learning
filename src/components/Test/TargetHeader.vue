<script setup lang="ts">

const props = defineProps<{ target: string }>();

</script>

<template>
  <h1 className="font-bold text-8xl text-center">
    {{ props.target }}
  </h1>
</template>
