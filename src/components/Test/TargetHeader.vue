<script setup lang="ts">

const props = defineProps<{ target: string }>();
defineEmits(['onAnimationEnd']);

</script>

<template>
  <h1
    class="h-1/6 font-bold text-8xl text-center"
    @animationend="$emit('onAnimationEnd')"
  >
    {{ props.target }}
  </h1>
</template>
