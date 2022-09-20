<template >
  <div class="min-w-max max-w-max mx-auto">
    <h1 class="text-2xl mt-2 text-center">Videotool - Webinterface</h1>
    <hr class="border-black mb-2" />

    <Overlay :isVisible="cameraModal">
      <CameraModal @closeModal="closeAddCameraModal" />
    </Overlay>
    <!-- <div class=""> -->
      <div class="grid grid-cols-3 gap-2 mb-2 flex-nowrap">
        <CameraTiles
          class=""
          v-for="(camera, index) in cameras"
          :key="'camera' + index"
          :camera="camera"
          :buffer="getBuffer(camera)"
          :concateRunning="concateBuffer && getBuffer(camera) != null"
          @deleteCamera="getCameras"
          @stopBuffer="stopBuffer"
          @startBuffer="startBuffer"
        />

        <div
          class="
            flex flex-col
            justify-between
            border border-black
            bg-gray-100
            rounded-lg
            w-96
            h-96
            p-1
            pb-px
          "
          @click="showAddCameraModal"
        >
          <label class="m-auto text-9xl text-gray-200">+</label>
        </div>
      </div>
      <Timeline class="" />
    <!-- </div> -->
  </div>
</template>

<script>
import Overlay from "../Components/Overlay.vue";
import CameraModal from "../Components/CameraModal.vue";
import CameraTiles from "@/Components/CameraTiles.vue";
import Timeline from "@/Components/Timeline.vue";

export default {
  name: "Welcome",
  components: { CameraModal, Overlay, CameraTiles, Timeline },
  data() {
    return {
      cameraModal: false,
      buffers: null,
      cameras: null,
      events: null,
    };
  },
  methods: {
    getCameras() {
      axios.get("/cameras").then((response) => {
        this.cameras = response.data;
      });
    },
    getRunningBuffers() {
      axios.get("/processes").then((response) => {
        this.buffers = response.data;
      });
    },
    getBuffer(camera) {
      return this.buffers?.find((buffer) => {
        return buffer.camera_id == camera.id;
      });
    },
    stopBuffer(camera) {
      let tempBufferIndex = this.buffers.findIndex((buffer) => {
        return buffer.camera_id == camera;
      });
      this.buffers.splice(tempBufferIndex, 1);

      this.getRunningBuffers();
    },
    startBuffer(camera) {
      axios.get(`startbuffer/${camera.id}`).then((response) => {
        console.log(`started buffer for ${camera.ip_address}`);
        this.buffers.push(response.data);
        this.getRunningBuffers();
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
    this.getRunningBuffers();
  },
  computed: {
    concateBuffer() {
      return this.buffers?.find((buf) => buf.command == "concateBuffer") !=
        undefined
        ? true
        : false;
    },
  },
};
</script>

