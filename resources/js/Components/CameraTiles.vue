<template>
  <div
    class="
      border border-black
      bg-gray-100
      rounded-lg
      w-96
      h-96
      min-w-min
      p-1
      flex flex-col
      justify-between
    "
  >
    <div class="">
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
    </div>
    <div v-if="lastEvent.timeStamp">
      <div class="flex justify-between">
        <label> Zeitpunkt </label>
        <label>
          {{
            lastEvent?.timeStamp?.split("T")[0] +
            " " +
            lastEvent?.timeStamp?.split("T")[1].split(".")[0]
          }}
        </label>
      </div>
      <VideoPlayer :videoSrc="lastEvent.videoSrc" />
    </div>
    <div class="flex justify-between">
      <button
        class="
          h-8
          mr-2
          hover:bg-red-500
          bg-red-400
          px-2
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
          h-8
          mr-2
          hover:bg-blue-500
          bg-blue-400
          px-2
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
          h-8
          mr-2
          hover:bg-blue-500
          bg-blue-400
          px-2
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
        class="
          h-8
          px-2
          min-w-max
          border-black border
          rounded
          text-sm
          bg-gray-300
        "
        :class="concateRunning ? ' hover:bg-gray-400' : ''"
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
  data() {
    return {
      lastEvent: {
        timeStamp: null,
        videoSrc: null,
      },
    };
  },
  methods: {
    getLastEvent() {
      axios.get(`events/${this.camera.id}/last`).then((response) => {
        this.lastEvent.videoSrc = response.data[0];
        this.lastEvent.timeStamp = response.data[1];
      });
    },
    deleteCamera() {
      if (
        confirm(
          `Delete Camera? (ID: ${this.camera.id} IP: ${this.camera.ip_address})`
        )
      ) {
        axios.delete(`cameras/${this.camera.id}`).then(() => {
          this.$emit("getCameras");
        });
      }
    },
    startBuffer() {
      console.log("startBuffer", this.camera.id);
      this.$emit("startBuffer", this.camera);
    },
    stopBuffer() {
      if (this.buffer != null) {
        axios.get(`processes/${this.camera.id}/stop`).then((response) => {
          this.$emit("stopBuffer", this.camera.id);
          console.log(`stopped buffer for ${this.camera.ip_address}`);
          console.log(response.data);
        });
      }
    },
    triggerEvent() {
      console.log(`processes/${this.camera.id}/trigger`);
      axios.get(`processes/${this.camera.id}/trigger`).then((response) => {
        console.log(response.data);
      });
    },
  },
  created() {
    this.getLastEvent();
  },
};
</script>
