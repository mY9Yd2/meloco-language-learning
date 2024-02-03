<script setup lang="ts">
import TargetHeader from './Test/TargetHeader.vue';
import OptionButtons from './Test/OptionButtons.vue';
import { onBeforeMount, onMounted, ref } from 'vue';
import { sampleSize, sample } from 'lodash';
import { Kana } from '../japanese/kanaType';
import * as hiragana from '../japanese/hiragana';
// import * as katakana from '../japanese/katakana';

const selection = hiragana.ALL_HIRAGANA;
let options = ref<Kana[]>([]);
let target = ref<Kana>({
    kana: '',
    romaji: '',
    audio: '',
});
let isSuccess = ref<boolean>(false);
let targetAudio = ref<HTMLAudioElement>(new Audio());

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
 * Check the selected option's kana and create a new test case
 * 
 * @param kana - The selected option's kana
 */
function checkSelectedOption(kana: string) {
    if (kana === target.value.kana) {
        isSuccess.value = true;
    } else {
        isSuccess.value = false;
    }
        
    createNewTestCase();
}

/**
 * Add animation and change the text color, depending on the selected option
 * 
 * Before the leave transition starts
 * 
 * @param el - The header element
 */
function onTargetBeforeLeave(el: Element) {
    if (isSuccess.value) {
        el.classList.add('text-[#ffff00]', 'animate__animated', 'animate__bounceOut');
    } else {
        el.classList.add('text-[#ff00fe]', 'animate__animated', 'animate__tada');
    }
}

/**
 * Remove the animation and the added color from the text, depending on the selected option
 * 
 * Before the element is inserted into the DOM
 * 
 * @param el - The header element
 */
function onTargetBeforeEnter(el: Element) {
    if (isSuccess.value) {
        el.classList.remove('text-[#ffff00]', 'animate__animated', 'animate__bounceOut');
    } else {
        el.classList.remove('text-[#ff00fe]', 'animate__animated', 'animate__tada');
    }
}

/**
 * Change the audio src after the transition has finished
 */
function onTargetAfterEnter() {
    targetAudio.value.src = target.value.audio;
}
</script>

<template>
  <div className="flex flex-col justify-evenly h-screen">
    <Transition
      mode="out-in"
      @before-leave="onTargetBeforeLeave"
      @before-enter="onTargetBeforeEnter"
      @after-enter="onTargetAfterEnter"
    >
      <TargetHeader
        :key="target.kana"
        :target="target.kana"
      />
    </Transition>
    <OptionButtons
      :options="options"
      @on-option-selected-event="checkSelectedOption"
    />
  </div>
</template>
