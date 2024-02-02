<script setup lang="ts">
import TargetHeader from './Test/TargetHeader.vue';
import OptionButtons from './Test/OptionButtons.vue';
import { onBeforeMount, ref } from 'vue';
import { sampleSize, sample } from 'lodash';
import { Kana } from '../japanese/kanaType';
import * as hiragana from '../japanese/hiragana';

const selection = [...hiragana.A, ...hiragana.K];
let options = ref<Kana[]>([]);
let target = ref<Kana>();
let isSuccess = ref<boolean>(false);

/**
 * Create a new test case on initialisation
 */
onBeforeMount(() => {
    createNewTestCase();
});

/**
 * Create a new test case
 */
function createNewTestCase() {
    const newSelection = selection.filter((kana) => kana.kana !== target.value?.kana);
    options.value = sampleSize(newSelection, 4);
    target.value = sample(options.value);
}

/**
 * Check the selected option and create a new test case
 * 
 * @param kana - The selected option
 */
function checkSelectedOption(kana: string) {
    if (kana === target.value?.kana) {
        isSuccess.value = true;
    } else {
        isSuccess.value = false;
    }
        
    createNewTestCase();
}

/**
 * Add animation and change the text color, depending on the selected option
 * 
 * @param el - The header element
 */
function targetBeforeLeave(el: Element) {
    if (isSuccess.value) {
        el.classList.add('text-[#ffff00]', 'animate__animated', 'animate__bounceOut');
    } else {
        el.classList.add('text-[#ff00fe]', 'animate__animated', 'animate__tada');
    }
}

/**
 * Remove the animation and the added color from the text, depending on the selected option
 * 
 * @param el - The header element
 */
function targetBeforeEnter(el: Element) {
    if (isSuccess.value) {
        el.classList.remove('text-[#ffff00]', 'animate__animated', 'animate__bounceOut');
    } else {
        el.classList.remove('text-[#ff00fe]', 'animate__animated', 'animate__tada');
    }
}
</script>

<template>
  <div className="flex flex-col justify-evenly h-screen">
    <Transition
      mode="out-in"
      @before-leave="targetBeforeLeave"
      @before-enter="targetBeforeEnter"
    >
      <TargetHeader
        :key="target?.kana"
        :target="target?.kana"
      />
    </Transition>
    <OptionButtons
      :options="options"
      @option-select="checkSelectedOption"
    />
  </div>
</template>
