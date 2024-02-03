<script setup lang="ts">
import { Kana } from '../../japanese/kanaType';

const props = defineProps<{ options: Kana[] }>();
defineEmits<{
    onOptionSelectedEvent: [chosen: string]
  }>();
</script>

<template>
  <div className="grid grid-cols-1 gap-4">
    <button
      v-for="option in props.options"
      :key="option.romaji"
      type="button"
      className="p-10 text-4xl rounded-full border-2 border-neutral-700"
      @click="$emit('onOptionSelectedEvent', option.kana)"
    >
      {{ option.romaji }}
    </button>
  </div>
</template>
