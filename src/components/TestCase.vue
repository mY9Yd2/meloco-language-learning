<script setup lang="ts">
import TargetHeader from './Test/TargetHeader.vue';
import OptionButtons from './Test/OptionButtons.vue';
import { onBeforeMount, ref, reactive } from 'vue';
import { sample, sampleSize } from '../utils/utils';
import { Kana } from '../japanese/kanaType';
import * as hiragana from '../japanese/hiragana';
import * as katakana from '../japanese/katakana';
import { useRoute } from 'vue-router';

const route = useRoute();

let selectedCategories: {
    name: string,
    category: Kana[],
}[];
const isStudyMode = route.query.studyMode === '1';
const routeSelectedCategoriesName: string[] = JSON.parse(route.query.selectedCategoriesName as string);

switch (route.query.test) {
case 'selectHiraganaBasic':
    selectedCategories = hiragana.CATEGORIES.filter((category) => routeSelectedCategoriesName.includes(category.name));
    break;
case 'selectKatakanaBasic':
    selectedCategories = katakana.CATEGORIES.filter((category) => routeSelectedCategoriesName.includes(category.name));
    break;
default:
    throw new Error('There is no implementation for this test');
}

const selection = Array.from(selectedCategories, (category) => category.category).flat();
const options = ref<Kana[]>([]);
const target = ref<Kana>({
    kana: '',
    romaji: '',
    audio: '',
});
const targetAudio = ref<HTMLAudioElement>(new Audio());
const targetAnimationClass = reactive({
    animate__animated: true,
    animate__bounceOut: false,
    animate__tada: false,
    target__successful: false,
    target__failed: false,
});

/**
 * Play the audio file on src change
 */
targetAudio.value.oncanplaythrough = (() => {
    targetAudio.value.play();
});

/**
 * Create a new test case before mounting the component
 */
onBeforeMount(() => {
    createNewTestCase();
});

/**
 * Create a new test case
 *
 * The previous target kana cannot be a new target
 */
function createNewTestCase() {
    options.value = sampleSize(selection, 4);
    target.value = sample(options.value.filter((kana) => kana.kana !== target.value.kana))!;
}

/**
 * Start the animation
 *
 * and play the audio file on succesful hit, when the study mode is disabled
 *
 * @param kana - The selected option's kana
 */
function onOptionSelectedEvent(kana: string) {
    if (kana === target.value.kana) {
        targetAnimationClass.target__successful = true;
        targetAnimationClass.animate__bounceOut = true;
        if (!isStudyMode) {
            targetAudio.value.src = target.value.audio;
        }
    } else {
        targetAnimationClass.target__failed = true;
        targetAnimationClass.animate__tada = true;
    }
}

/**
 * Change the audio src before the Header is mounted
 *
 * Only when the study mode is enabled
 */
function onHeaderMounted() {
    if (isStudyMode) {
        targetAudio.value.src = target.value.audio;
    }
}

/**
 * Stop the animation and create a new test case
 */
function onAnimationEnd() {
    targetAnimationClass.target__failed = false;
    targetAnimationClass.target__successful = false;
    targetAnimationClass.animate__bounceOut = false;
    targetAnimationClass.animate__tada = false;

    createNewTestCase();
}
</script>

<template>
  <div class="flex flex-col justify-evenly h-screen">
    <TargetHeader
      :key="target.kana"
      :class="targetAnimationClass"
      :target="target.kana"
      @on-animation-end="onAnimationEnd"
      @vue:before-mount="onHeaderMounted"
    />
    <OptionButtons
      :options="options"
      :target="target"
      @on-option-selected-event="onOptionSelectedEvent"
    />
  </div>
</template>


<style scoped>
.target__successful {
    color: #ffff00;
}

.target__failed {
    color: #ff00fe;
}
</style>
