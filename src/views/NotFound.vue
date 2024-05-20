<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <h1
      class="text-center text-4xl"
    >
      This page does not exist
    </h1>
    <router-link
      :to="{ name: 'home' }"
      class="text-2xl my-5 p-2 rounded-lg bg-[#333333] border-2 border-[#666666]"
    >
      Home
    </router-link>
  </div>
</template>
