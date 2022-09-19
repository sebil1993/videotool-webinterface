<template>
  <div
    class="
      flex flex-col
      justify-between
      border border-black
      bg-gray-100
      rounded-lg
      w-fit
      p-1
      mb-1
    "
  >
    <div>
      <div class="flex justify-between">
        <label> Camera-ID: </label>
        <label> {{ camera.id }} </label>
      </div>
      <div class="flex justify-between">
        <label> IP-Address: </label>
        <label> {{ camera.ip_address }} </label>
      </div>
      <div class="flex justify-between">
        <label> User: </label>
        <label> {{ camera.username }} </label>
      </div>
      <hr class="border-black" />
      <VideoPlayer :camera="camera" />
    </div>
    <div class="flex justify-between gap-2">
      <button
        class="
          hover:bg-red-500
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
          hover:bg-blue-500
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
        :disabled="!concateRunning"
        class="px-2 h-10 min-w-max border-black border rounded text-sm"
        :class="
          concateRunning ? ' bg-gray-300 hover:bg-gray-400' : 'bg-gray-300'
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
import VideoPlayer from "@/Components/VideoPlayer.vue";

export default {
  components: {
    VideoPlayer,
  },
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

  methods: {
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
  created() {},
};
</script>
