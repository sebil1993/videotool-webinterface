<template>
  <div
    class="
      flex flex-col
      justify-between
      border
      bg-gray-100
      w-80
      h-80
      rounded-lg
    "
  >
    <div>
      <div>
        <label> Camera-ID: </label>
        <label> {{ camera.id }} </label>
      </div>
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
      <button
        class="bg-red-400 px-2 border-black border rounded"
        @click="deleteCamera"
      >
        Delete Camera
      </button>
      <button
        v-if="process == null"
        class="bg-blue-400 px-2 border-black border rounded"
        @click="startBuffer"
      >
        Start Buffer
      </button>
      <button
        v-else
        class="bg-blue-400 px-2 border-black border rounded"
        @click="stopBuffer"
      >
        Stop Buffer
      </button>
      <button
        class="bg-gray-300 px-2 border-black border rounded"
        @click="triggerEvent"
      >
        Trigger Event
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    camera: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      process: null,
    };
  },
  methods: {
    deleteCamera() {
      this.stopBuffer();
      axios.delete(`cameras/${this.camera.id}`).then(() => {
        this.$emit("getCameras");
      });
    },
    startBuffer() {
      axios.get(`startbuffer/${this.camera.id}`).then((response) => {
        this.process = response.data;
        console.log(`started buffer for ${this.camera.ip_address}`);
      });
    },
    stopBuffer() {
      if (this.process.p_id) {
        axios.get(`stopbuffer/${this.process.p_id}`).then((response) => {
          this.process = null;
          console.log(`stopped buffer for ${this.camera.ip_address}`);
        });
      }
    },
  },
  computed: {
    hasProcess() {
      return this.process ? false : true;
    },
  },
};
</script>
