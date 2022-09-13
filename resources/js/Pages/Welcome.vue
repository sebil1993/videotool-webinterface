<template>
<div>
  <h1 class="text-2xl ml-3 mt-2 text-center">Videotool - Webinterface </h1>
  <hr>
</div>
  <div class="pt-2 pl-2 w-fit">
    <Overlay :isVisible="cameraModal">
      <CameraModal @closeModal="closeAddCameraModal" />
    </Overlay>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="(camera, index) in cameras" :key="'camera' + index">
        <CameraTiles :camera="camera" @getCameras="getCameras" />
      </div>
      <div
        class="flex justify-center border bg-gray-100 w-80 h-80 rounded-lg"
        @click="showAddCameraModal"
      >
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
    getCameras() {
      axios.get("/cameras").then((response) => {
        this.cameras = response.data;
      });
    },
    closeAddCameraModal() {
      this.cameraModal = false;
      this.getCameras();
    },
    showAddCameraModal() {
      this.cameraModal = true;
    },
  },
  created() {
    this.getCameras();
  },
};
</script>

