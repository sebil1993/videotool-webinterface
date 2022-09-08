<template>
  <h1>Hallo</h1>
  <button class="px-2 border-2 border-black rounded-lg" @click="sayHi">sag hallo</button>
</template>

<script>
export default {
  name: "Welcome",
//   components:{},
  data() {
    return {
      cameras: null,
      events: null,
      eventtypes: null,
    };
  },
  methods: {
    sayHi() {
      console.log("hihi");
    },
  },
};
</script>

<style>
</style>
