<template>
  <div class="border border-black">
    <button
      class="mt-2 ml-2 px-2 border-2 border-b-0 hover:border-b-2 border-black "
      @click="showAddCameraModal"
    >
      Add Camera
    </button>
  </div>
  <div class="pl-2 w-fit ">
    <overlay :isVisible="cameraModal">
      <camera-modal @closeModal="closeAddCameraModal" />
    </overlay>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="(camera, index) in cameras" :key="'camera' + index">
        <camera-tiles :camera="camera" />
      </div>
      <div class="flex justify-center border bg-gray-100 w-80 h-80 rounded-lg">
        <label class="m-auto text-9xl text-gray-200">+</label>
      </div>
    </div>
  </div>
</template>

<script>
import Overlay from "../Components/Overlay.vue";
import CameraModal from "../Components/CameraModal.vue";
import CameraTiles from "@/Components/CameraTiles.vue";
export default {
  name: "Welcome",
  components: { CameraModal, Overlay, CameraTiles },
  data() {
    return {
      cameraModal: false,
      cameras: null,
      events: null,
      eventtypes: null,
    };
  },
  methods: {
    closeAddCameraModal() {
      this.cameraModal = false;
    },
    showAddCameraModal() {
      this.cameraModal = true;
    },
  },
  created() {
    axios.get("/cameras").then((response) => {
      this.cameras = response.data;
    });
  },
};
</script>

<style>
</style>
