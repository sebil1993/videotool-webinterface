<template>
  <div class="w-full flex bg-gray-200/50 justify-between text-sm">
    <div>
      <button v-if="true" class="px-2 bg-gray-200/50">
        <font-awesome-icon icon="fa-solid fa-play" />
      </button>
      <button v-if="true" class="border-black border px-2 bg-gray-200/50">
        <font-awesome-icon icon="fa-solid fa-pause" />
      </button>
    </div>

    <div
      class="mx-2 my-auto w-full bg-gray-500 rounded-full h-2.5"
      @click="computePosition"
    >
      <div
        :id="ownID"
        class="bg-blue-600 h-2.5 rounded-full"
        :style="'width: ' + progress + '%;'"
      ></div>
    </div>

    <button v-if="true" class="px-2 bg-gray-200/50">
      <font-awesome-icon icon="fa-solid fa-expand" />
    </button>
  </div>
</template>

<script>
export default {
  name: "VideoControls",
  props: {
    videoElement: {
      type: Object,
      required: false,
    },
  },

  methods: {
    computePosition(event) {
      let offsetLeft = event.target.getBoundingClientRect().left;
      let x = event.clientX - offsetLeft;
      let targetWidth = event.target.offsetWidth;
      let procentualTime = (x / targetWidth).toFixed(2) * 100;

      console.log("jetzige zeit video: ", this.videoElement.currentTime);
      console.log(
        "set jetzige zeit auf: ",
        this.videoElement.duration * (procentualTime / 100)
      );
      this.videoElement.currentTime =
        this.videoElement.duration * (procentualTime / 100);
      //
      //     this.videoElement.duration / procentualTime;
    },
  },
  computed: {
    progress() {
      if (!isNaN(this.videoElement.currentTime / this.videoElement.duration))
        return (
          (this.videoElement.currentTime / this.videoElement.duration) * 100
        );
      else return 0;
    },
    ownID() {
      if (this.videoElement) {
        return this.videoElement.id + "_controls";
      }
    },
  },
};
</script>

