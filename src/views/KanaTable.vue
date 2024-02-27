<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Kana } from '../japanese/kanaType';
import { useRoute } from 'vue-router';

const table = ref<HTMLTableElement | null>(null);
const targetAudio = ref<HTMLAudioElement>(new Audio());
defineProps<{
  categories: {
    name: string,
    category: Kana[],
  }[],
  selectViewName: string,
}>();
const route = useRoute();

/**
 * Fix some kana positions in the table
 *
 * by inserting empty cells into the table
 */
onMounted(() => {
    if (route.name === 'hiraganaBasic' || route.name === 'katakanaBasic') {
        // ya - (empty) - yu - (empty) - yo
        table.value?.rows[7].insertCell(1);
        table.value?.rows[7].insertCell(3);

        // wa - 3x(empty) - wo
        table.value?.rows[9].insertCell(1);
        table.value?.rows[9].insertCell(1);
        table.value?.rows[9].insertCell(1);

        // n (x at the beginning of the new row)
        const row = table.value?.insertRow();
        const cell = table.value?.rows[9].cells[5];
        row?.appendChild(cell!);
    }
});

/**
 * Play the audio file on src change
 */
targetAudio.value.oncanplaythrough = (() => {
    targetAudio.value.play();
});

/**
 * Change the audio source on click
 *
 * @param audioSrc - Kana audio source
 */
function onKanaClick(audioSrc: string) {
    targetAudio.value.src = audioSrc;
}
</script>

<template>
  <div
    className="w-full max-w-screen-sm mx-auto my-4 text-center"
  >
    <router-link
      :to="{ name: selectViewName }"
      class="text-4xl bg-green-700 rounded-lg p-2 block"
    >
      Select categories
    </router-link>
  </div>
  <table
    ref="table"
    className="w-full max-w-screen-sm mx-auto"
  >
    <tbody>
      <tr
        v-for="category in categories"
        :key="category.name"
      >
        <td
          v-for="kana in category.category"
          :key="kana.kana"
          className="text-center text-2xl p-1"
        >
          <button
            className="w-12 h-1/6 bg-[#333333] rounded-lg"
            @click="onKanaClick(kana.audio)"
          >
            <div>{{ kana.kana }}</div>
            <div>{{ kana.romaji }}</div>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
