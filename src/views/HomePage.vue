<script setup lang="ts">
</script>

<template>
  <h1
    class="text-center text-4xl"
  >
    Japanese
  </h1>
  <hr class="my-5">
  <ul class="text-center space-y-5 max-w-screen-sm mx-auto">
    <li
      class="rounded-lg bg-[#333333] border-2 border-[#666666]"
    >
      <router-link
        :to="{ name: 'hiraganaBasic' }"
        class="p-2 block"
      >
        Hiragana basic
      </router-link>
    </li>
    <li
      class="rounded-lg bg-[#333333] border-2 border-[#666666]"
    >
      <router-link
        :to="{ name: 'katakanaBasic' }"
        class="p-2 block"
      >
        Katakana basic
      </router-link>
    </li>
  </ul>
</template>
