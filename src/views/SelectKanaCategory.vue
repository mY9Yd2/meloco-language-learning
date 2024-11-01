<script setup lang="ts">
import { IconSchool } from '@tabler/icons-vue';
import type { Kana } from '@/japanese/kanaType';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

defineProps<{
  categories: {
    name: string;
    category: Kana[];
  }[];
}>();

const router = useRouter();
const route = useRoute();
/**
 * The variable is just a dependency to trigger a recompute
 */
const trigger = ref(false);
const buttonRefs = ref<HTMLButtonElement[]>([]);
/**
 * Enable the start button only if there is
 * at least one category is selected
 */
const isStartButtonDisabled = computed(() => {
  // TODO: Find a better way
  trigger.value; // dependency

  for (const button of buttonRefs.value) {
    if (button.dataset.include) {
      return false;
    }
  }

  return true;
});
const toggleAllButtonRef = ref<HTMLButtonElement | null>(null);
const toggleStudyButtonRef = ref<HTMLButtonElement | null>(null);

/**
 * Toggle on/off whether or not to include the category in the test
 *
 * @param event - Mouse event
 */
function onCategoryClick(event: MouseEvent) {
  trigger.value = !trigger.value;
  const button = event.target as HTMLButtonElement;

  if (button.dataset.include) {
    button.dataset.include = '';
    toggleAllButtonRef.value!.dataset.include = '';
  } else {
    button.dataset.include = 'true';
  }
}

/**
 * Toggle on/off whether or not to include all of them in the test
 */
function onCategoryToggleAllClick() {
  trigger.value = !trigger.value;
  if (toggleAllButtonRef.value?.dataset.include) {
    toggleAllButtonRef.value.dataset.include = '';
    buttonRefs.value.forEach(button => {
      button.dataset.include = '';
    });
  } else {
    toggleAllButtonRef.value!.dataset.include = 'true';
    buttonRefs.value.forEach(button => {
      button.dataset.include = 'true';
    });
  }
}

/**
 * Study mode on/off
 */
function toggleStudyModeClick() {
  if (toggleStudyButtonRef.value?.dataset.studyMode) {
    toggleStudyButtonRef.value.dataset.studyMode = '';
    toggleStudyButtonRef.value.firstElementChild?.classList.add('opacity-50');
  } else {
    toggleStudyButtonRef.value!.dataset.studyMode = 'true';
    toggleStudyButtonRef.value!.firstElementChild?.classList.remove(
      'opacity-50',
    );
  }
}

/**
 * Switch to the test page and pass the necessary query parameters to it
 */
function startTest() {
  const selectedCategoriesName: string[] = [];
  buttonRefs.value.forEach(button => {
    if (button.dataset.include) {
      selectedCategoriesName.push(button.innerText);
    }
  });
  router.push({
    name: 'test',
    query: {
      test: route.name as string,
      studyMode: toggleStudyButtonRef.value?.dataset.studyMode ? 1 : 0,
      selectedCategoriesName: JSON.stringify(selectedCategoriesName),
    },
  });
}
</script>

<template>
  <fieldset class="border-2 border-green-700 p-5 my-5 text-2xl">
    <legend class="px-3">Practice</legend>
    <button
      class="bg-[#0d4e0e] disabled:bg-[#4d0c4c] text-[#00ff00] disabled:text-[#7a4a7a] rounded-lg w-full p-2 text-center"
      :disabled="isStartButtonDisabled"
      @click="startTest"
    >
      Start
    </button>
  </fieldset>

  <fieldset class="border-2 border-green-700 px-5 my-5 text-2xl">
    <legend class="px-3">Study mode?</legend>
    <button
      ref="toggleStudyButtonRef"
      class="my-5 bg-[#121212] border-2 border-[#333333] rounded-lg w-full p-2 flex justify-center"
      data-study-mode="true"
      @click="toggleStudyModeClick"
    >
      <IconSchool :size="32" />
    </button>
  </fieldset>

  <fieldset class="border-2 border-green-700 px-5 my-5 text-2xl">
    <legend class="px-3">Select categories</legend>
    <button
      ref="toggleAllButtonRef"
      class="my-5 bg-[#121212] border-2 border-[#333333] rounded-lg w-full p-2"
      data-include="true"
      @click="onCategoryToggleAllClick"
    >
      Toggle all
    </button>
    <ul>
      <li
        v-for="category in categories"
        :key="category.name"
        class="text-2xl my-5"
      >
        <button
          ref="buttonRefs"
          class="bg-[#121212] border-2 border-[#333333] rounded-lg w-full p-2"
          data-include="true"
          @click="onCategoryClick"
        >
          {{ category.name }}
        </button>
      </li>
    </ul>
  </fieldset>
</template>

<style scoped>
button[data-include='true'],
button[data-study-mode='true'] {
  background-color: #333333;
  border-color: #666666;
}
</style>
