<template>
  <div class="w-full border-2 border-black h-80 flex flex-col justify-center">
    <div class="border border-black flex justify-between">
      <div class="text-xs mr-px" v-for="i in 100" :key="'i' + i">
        {{ `${i % 25 == 0 ? i : ""}` }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  methods: {
    getEvents() {
      axios.get(`events`);
    },
  },
};
</script>

<style>
</style>