<template>
  <div class="flex flex-col justify-between border bg-gray-100 w-80 h-80 rounded-lg">
    <div>
      <div>
        <label> IP-Address: </label>
        <label> {{ camera.ip_address }} </label>
      </div>
      <div>
        <label> User: </label>
        <label> {{ camera.username }} </label>
      </div>
      <!-- <video :src="getLastEvent" alt=""> -->
    </div>
    <div class="flex justify-between">
      <button class="bg-blue-300 px-2 border-black border rounded">
        Edit Camera
      </button>
      <button class="bg-blue-300 px-2 border-black border rounded">
        Show Events
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    camera: {
      type: Object,
      required: false,
    },
  },
  methos: {
    getLastEvent(){
      axios.get("")
    }
  }
};
</script>
