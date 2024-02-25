<script setup lang="ts">
</script>

<template>
  <h1
    className="text-center text-4xl"
  >
    Japanese
  </h1>
  <hr className="my-5">
  <ul className="text-center space-y-5 max-w-screen-sm mx-auto">
    <li
      className="rounded-lg bg-[#333333] border-2 border-[#666666]"
    >
      <router-link
        :to="{ name: 'hiraganaBasic' }"
        class="p-2 block"
      >
        Hiragana basic
      </router-link>
    </li>
    <li
      className="rounded-lg bg-[#333333] border-2 border-[#666666]"
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
