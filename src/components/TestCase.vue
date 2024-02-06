<script setup lang="ts">
import TargetHeader from './Test/TargetHeader.vue';
import OptionButtons from './Test/OptionButtons.vue';
import { onBeforeMount, onMounted, ref, provide, reactive } from 'vue';
import { sampleSize, sample } from 'lodash';
import { Kana } from '../japanese/kanaType';
import * as hiragana from '../japanese/hiragana';
// import * as katakana from '../japanese/katakana';

const selection = hiragana.ALL_HIRAGANA;
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

provide('target', target);

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
 * After the component is mounted, play the target audio file
 */
onMounted(() => {
    targetAudio.value.src = target.value.audio;
});

/**
 * Create a new test case
 */
function createNewTestCase() {
    const newSelection = selection.filter((kana) => kana.kana !== target.value.kana);
    options.value = sampleSize(newSelection, 4);
    target.value = sample(options.value)!;
}

/**
 * Start the animation
 * 
 * @param kana - The selected option's kana
 */
function startAnimation(kana: string) {    
    if (kana === target.value.kana) {
        targetAnimationClass.target__successful = true;
        targetAnimationClass.animate__bounceOut = true;
    } else {
        targetAnimationClass.target__failed = true;
        targetAnimationClass.animate__tada = true;
    }
}

/**
 * Change the audio src after the Header is mounted
 */
function onHeaderMounted() {    
    targetAudio.value.src = target.value.audio;
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
  <div className="flex flex-col justify-evenly h-screen">
    <TargetHeader
      :key="target.kana"
      :class="targetAnimationClass"
      :target="target.kana"
      @on-animation-end="onAnimationEnd"
      @vue:mounted="onHeaderMounted"
    />
    <OptionButtons
      :options="options"
      @on-option-selected-event="startAnimation"
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
