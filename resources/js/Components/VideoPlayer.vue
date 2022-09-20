<template>
  <div @mouseenter="showControls" @mouseleave="hideControls">
    <video class="" :src="videoSrc"></video>
    <div class="w-full h-7 flex border border-black justify-between">
      <button
        v-if="controlsVisible == true"
        @click="playVideo"
        class="border-black border-r px-2 bg-green-200"
      >
        ►
      </button>
      <button
        v-if="controlsVisible == true"
        @click="pauseVideo"
        class="border-black border-x px-2 bg-gray-200 font-extrabold"
      >
        ||
      </button>
      <button
        v-if="controlsVisible == true"
        @click="fullVideo"
        class="border-black border-l px-2 bg-gray-200 font-extrabold"
      >
        ⤡

        <label class="-ml-[19.5px]" for="">⤢</label>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "VideoPlayer",
  props: {
    videoSrc: {
      required: false,
    },
  },
  data() {
    return {
      controlsVisible: false,
      videoPlayer: null,
      last: {
        event: "",
        timestamp: "",
      },
    };
  },
  methods: {
    showControls() {
      this.controlsVisible = true;
    },
    hideControls() {
      this.controlsVisible = false;
    },
  },
};
</script>
