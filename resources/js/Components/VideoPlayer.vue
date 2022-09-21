<template>
  <div @mouseenter="showControls" @mouseleave="hideControls" class="relative">
    <video v-if="videoSrc.length > 0" :id="videoID" :src="videoSrc" @timeupdate="videoPlaying" :controls="controlsVisible"></video>
    <!-- <VideoControls
      v-if="controlsVisible && videoSrc != ''"
      class="absolute bottom-0"
      :videoElement="videoElement"
    /> -->
  </div>
</template>

<script>
import VideoControls from "./VideoControls.vue";
export default {
  name: "VideoPlayer",
  components: { VideoControls },
  props: {
    videoSrc: {
      required: true,
      default: "",
    },
  },
  data() {
    return {
      timeElapsed: 0,
      duration: 0,
      controlsVisible: false,
      videoID: "",
    };
  },
  methods: {
    videoPlaying() {
      this.timeElapsed = this.videoElement.currentTime;
      this.duration = this.videoElement.duration;
    },
    showControls() {
      if (this.videoSrc != null) {
        this.controlsVisible = true;
      }
    },
    hideControls() {
      if (this.videoSrc != null) {
        this.controlsVisible = false;
      }
    },
  },
  created() {
    this.videoID = (Math.random() + 1).toString(36).substring(7);
  },
  computed: {
    videoElement() {
      if (this.videoSrc.length > 0) {
        return document.getElementById(this.videoID);
      }
    },
    // getCurrentTime() {
    //   if (this.videoSrc.length > 0) {
    //     return this.videoElement.currentTime;
    //   }
    // },
    // getDuration() {
    //   if (this.videoSrc.length > 0) {
    //     return this.videoElement.duration;
    //   }
    // },
    // isPlaying() {
    //   return this.videoElement?.paused ? false : true;
    // },
  },
};
</script>
