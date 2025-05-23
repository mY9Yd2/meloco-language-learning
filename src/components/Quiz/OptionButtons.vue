<script setup lang="ts">
import { onUpdated, ref } from 'vue';
import type { Kana } from '@/japanese/kanaType';

const props = defineProps<{
  options: Kana[];
  target: Kana;
}>();
const buttonRefs = ref<HTMLButtonElement[]>([]);
const emit = defineEmits<{
  onOptionSelectedEvent: [chosenKana: string];
}>();

/**
 * Enable buttons and reset it's style on update
 */
onUpdated(() => {
  buttonRefs.value.forEach(button => {
    button.classList.remove('successful', 'failed', 'solution', 'neutral');
    button.disabled = false;
  });
});

/**
 * Add CSS classes to the buttons and emit
 * onOptionSelectedEvent at the end
 *
 * @param kana - The selected kana
 */
function onClick(kana: Kana) {
  buttonRefs.value.forEach(button => {
    button.disabled = true;
    if (
      button.innerText === kana.romaji &&
      kana.romaji === props.target.romaji
    ) {
      button.classList.add('successful');
    } else if (button.innerText === kana.romaji) {
      button.classList.add('failed');
    } else if (button.innerText === props.target.romaji) {
      button.classList.add('solution');
    } else {
      button.classList.add('neutral');
    }
  });
  emit('onOptionSelectedEvent', kana.kana);
}
</script>

<template>
  <div class="h-3/6 grid grid-cols-2 gap-4 content-center">
    <button
      v-for="option in props.options"
      :key="option.romaji"
      ref="buttonRefs"
      type="button"
      class="max-h-28 p-2 md:p-10 text-4xl rounded-full border-2 border-neutral-700"
      @click="onClick(option)"
    >
      {{ option.romaji }}
    </button>
  </div>
</template>

<style scoped>
button.neutral {
  opacity: 0.4;
}

button.failed {
  background-color: #4d0c4c;
  color: #ff00fe;
  border: 6px dotted #ff00fe;
}

button.successful {
  background-color: #ffff00;
  color: black;
}

button.solution {
  background-color: #00ffff;
  color: black;
}

div button:not(:nth-child(4)):last-child {
  grid-column: span 2 / span 2;
}
</style>
