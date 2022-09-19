<template>
  <div class="m-auto">
    <div class="flex justify-between">
      <label>Last Event:</label>
      <!-- <label>{{
        last.timestamp.split("T")[0] + " " + last.timestamp.split("T")[1]
      }}</label> -->
    </div>
    <div
      class="border border-black mb-1"
      @mouseenter="showControls"
      @mouseleave="hideControls"
    >
      <!-- <video
        class="w-full"
        :id="'video' + camera.id"
        :src="last.event"
        :controls="false"
      ></video> -->
      <video class="w-full" :controls="false"></video>
      <div class="w-full h-7 border-t border-black flex justify-between">
        <button
          v-if="controlsVisible == true"
          @click="playVideo"
          class="border-black border-r px-2 bg-gray-200"
        >
          PLAY
        </button>
        <button
          v-if="controlsVisible == true"
          @click="pauseVideo"
          class="border-black border-l border-r px-2 bg-gray-200"
        >
          PAUSE
        </button>
        <button
          v-if="controlsVisible == true"
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
import axios from "axios";
export default {
  name: "VideoPlayer",
  // props: {
  //   camera: {
  //     type: Object,
  //     required: true,
  //   },
  // },
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
  // methods: {
  //   pauseHandler(e) {
  //     console.log(e.target);
  //   },
  //   playHandler(e) {
  //     console.log(e.target);
  //   },
  //   getLastEvent() {
  //     axios.get(`events/${this.camera.id}`).then((response) => {
  //       this.last.event = response.data[0];
  //       this.last.timestamp = response.data[1].split(".")[0];
  //     });
  //   },
  //   playVideo() {
  //     this.videoElement.play();
  //   },
  //   pauseVideo() {
  //     this.videoElement.pause();
  //   },
  //   fullVideo() {
  //     let video = this.videoElement;
  //     video.style.position = "absolute";
  //     video.style.top = 0;
  //     video.style.left = 0;
  //     video.style.height = video.clientHeight * 2;
  //     video.style.width = video.clientWidth * 2;
  //     new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
  //       video.style.position = "relative";
  //       video.style.height = video.clientHeight / 2;
  //       video.style.width = video.clientWidth / 2;
  //     });
  //   },
  //   showControls() {
  //     this.controlsVisible = true;
  //   },
  //   hideControls() {
  //     this.controlsVisible = false;
  //   },
  // },
  // created() {
  //   this.getLastEvent();
  //   this.videoPlayer = this.videoElement;
  // },
  // computed: {
  //   videoElement() {
  //     return document.getElementById(`video${this.camera.id}`);
  //     // return document.getElementById(`video${this.camera.id}`);
  //   },
  // },
};
</script>
