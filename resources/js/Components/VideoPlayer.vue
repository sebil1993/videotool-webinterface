<template>
  <div @mouseover="showControls" class="h-min">
    <div class="flex justify-between">
      <label>Last Event:</label>
      <label>{{ last.timestamp }}</label>
    </div>
    <div class="border border-black mb-1">
      <video id="video" :src="last.event"></video>
      <div
        class="
          w-full
          bg-gray-300
          h-7
          border-t border-black
          flex
          justify-between
        "
      >
        <button
          @click="playVideo"
          class="border-black border-r px-2 bg-gray-200"
        >
          PLAY
        </button>
        <button
          @click="pauseVideo"
          class="border-black border-l border-r px-2 bg-gray-200"
        >
          PAUSE
        </button>
        <button
          @click="fullVideo"
          class="border-black border-l px-2 bg-gray-200"
        >
          FULL
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import videojs from "video.js";
import axios from "axios";
export default {
  name: "VideoPlayer",
  props: {
    camera: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      last: {
        event: "",
        timestamp: "",
      },
    };
  },
  methods: {
    getLastEvent() {
      axios.get(`events/${this.camera.id}`).then((response) => {
        this.last.event = response.data[0];
        this.last.timestamp = response.data[1].split(".")[0];
      });
    },
    playVideo() {
      console.log("playVideo");
    },
    pauseVideo() {
      console.log("pauseVideo");
    },
    fullVideo() {
      let video = document.getElementById("video");
      video.style.position = "absolute";
      video.style.height = video.clientHeight * 2;
      video.style.width = video.clientWidth * 2;
      new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        video.style.position = "relative";
        video.style.height = video.clientHeight/2;
        video.style.width = video.clientWidth/2;
      });
    },
    showControls() {},
  },
  created() {
    this.getLastEvent();
  },
};
</script>
