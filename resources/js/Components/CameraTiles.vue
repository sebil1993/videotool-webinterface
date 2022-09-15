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
      <video :src="lastEvent" alt="" />
    </div>
    <!-- <video :src="getLastEvent" /> -->
    <div class="flex justify-start gap-2">
      <button
        class="
          bg-red-400
          px-2
          h-10
          min-w-max
          border-black border
          rounded
          text-sm
        "
        @click="deleteCamera"
      >
        Delete Camera
      </button>
      <button
        v-if="buffer == null"
        class="
          bg-blue-400
          px-2
          h-10
          min-w-max
          border-black border
          rounded
          text-sm
        "
        @click="startBuffer"
      >
        Start Buffer
      </button>
      <button
        v-else
        class="
          bg-blue-400
          px-2
          h-10
          min-w-max
          border-black border
          rounded
          text-sm
        "
        @click="stopBuffer"
      >
        Stop Buffer
      </button>
      <button
        v-if="concateRunning"
        class="
          bg-gray-300
          px-2
          h-10
          min-w-max
          border-black border
          rounded
          text-sm
        "
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
      required: true,
    },
    buffer: {
      type: Object,
      required: false,
    },
    concateRunning: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data(){
    return {
      lastEvent: null,
    }
  },
  methods: {
    getLastEvent() {
      axios.get(`events/${this.camera.id}`).then((response) => {
        this.lastEvent = response.data;
      });
      
    },
    deleteCamera() {
      this.stopBuffer();
      axios.delete(`cameras/${this.camera.id}`).then(() => {
        this.$emit("getCameras");
      });
    },
    startBuffer() {
      console.log("startBuffer", this.camera.id);
      this.$emit("startBuffer", this.camera);
    },
    stopBuffer() {
      if (this.buffer != null) {
        axios.delete(`processes/${this.camera.id}`).then((response) => {
          this.$emit("stopBuffer", this.camera.id);
          console.log(`stopped buffer for ${this.camera.ip_address}`);
          console.log(response.data);
        });
      }
    },
    triggerEvent() {
      console.log(`trigger/${this.camera.id}`);
      axios.get(`trigger/${this.camera.id}`).then((response) => {
        console.log(response.data);
      });
    },
  },
  created() {
    this.getLastEvent();
  },
};
</script>
