<script setup lang="ts">
import { IconSchool } from '@tabler/icons-vue';
import type { Kana } from '@/japanese/kanaType';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
  categories: {
    name: string;
    category: Kana[];
  }[];
}>();

const { categories } = props;

const router = useRouter();
const route = useRoute();
const selectedCategories = ref<string[]>(
  categories.map(category => category.name),
);
const studyMode = ref(true);

/**
 * Enable the start button only if there is
 * at least one category selected
 */
const isStartButtonDisabled = computed(
  () => selectedCategories.value.length === 0,
);

/**
 * Toggle on/off a specific category in the test
 *
 * @param category - The name of the category to toggle
 */
function onCategoryClick(category: string) {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(
      selected => selected !== category,
    );
  } else {
    selectedCategories.value.push(category);
  }
}

/**
 * Toggle on/off all categories in the test
 */
function onCategoryToggleAllClick() {
  if (selectedCategories.value.length === categories.length) {
    selectedCategories.value = [];
  } else {
    selectedCategories.value = categories.map(category => category.name);
  }
}

/**
 * Toggle Study Mode on/off and update button appearance
 */
function toggleStudyModeClick() {
  studyMode.value = !studyMode.value;
}

/**
 * Switch to the test page and pass query parameters for study mode and selected categories
 */
function startTest() {
  router.push({
    name: 'test',
    query: {
      test: route.name as string,
      studyMode: studyMode.value.toString(),
      selectedCategoriesName: JSON.stringify(selectedCategories.value),
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
      class="my-5 bg-[#121212] border-2 border-[#333333] rounded-lg w-full p-2 flex justify-center"
      :class="
        studyMode
          ? 'bg-[#333333] border-[#666666]'
          : 'bg-[#121212] border-[#333333]'
      "
      :title="studyMode ? 'Disable Study Mode' : 'Enable Study Mode'"
      @click="toggleStudyModeClick"
    >
      <IconSchool :size="32" />
    </button>
  </fieldset>

  <fieldset class="border-2 border-green-700 px-5 my-5 text-2xl">
    <legend class="px-3">Select categories</legend>
    <button
      class="my-5 bg-[#121212] border-2 border-[#333333] rounded-lg w-full p-2"
      :class="{
        'bg-[#333333] border-[#666666]':
          selectedCategories.length === categories.length,
      }"
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
          class="bg-[#121212] border-2 border-[#333333] rounded-lg w-full p-2"
          :class="{
            'bg-[#333333] border-[#666666]': selectedCategories.includes(
              category.name,
            ),
          }"
          @click="onCategoryClick(category.name)"
        >
          {{ category.name }}
        </button>
      </li>
    </ul>
  </fieldset>
</template>

<style scoped>
button[data-study-mode='true'] {
  background-color: #333333;
  border-color: #666666;
}
</style>
