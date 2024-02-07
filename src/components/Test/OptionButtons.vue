<script setup lang="ts">
import { Ref, inject, onBeforeUpdate, onUpdated } from 'vue';
import { Kana } from '../../japanese/kanaType';

const props = defineProps<{ options: Kana[] }>();
const target = inject<Ref<Kana>>('target');
const buttonRefs: HTMLButtonElement[] = [];
const emit = defineEmits<{
    onOptionSelectedEvent: [chosenKana: string]
  }>();

/**
 * Clear the array before update
 */
onBeforeUpdate(() => buttonRefs.length = 0);

/**
 * Enable buttons and reset it's style on update
 */
onUpdated(() => {
    buttonRefs.forEach((button) => {
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
    buttonRefs.forEach((button) => {
        button.disabled = true;
        if (button.textContent === kana.romaji && kana.romaji === target?.value.romaji) {
            button.classList.add('successful');
        } else if (button.textContent === kana.romaji) {
            button.classList.add('failed');
        } else if (button.textContent === target?.value.romaji) {
            button.classList.add('solution');
        } else {
            button.classList.add('neutral');
        }
    });
    emit('onOptionSelectedEvent', kana.kana);
}
</script>

<template>
  <div className="h-3/6 grid grid-cols-2 sm:grid-cols-2 gap-4 content-center">
    <button
      v-for="option in props.options"
      :key="option.romaji"
      ref="buttonRefs"
      type="button"
      className="max-h-28 p-2 md:p-10 text-4xl rounded-full border-2 border-neutral-700"
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
</style>
