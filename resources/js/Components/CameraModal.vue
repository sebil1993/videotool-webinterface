<template>
  <div class="min-w-fit">
    <h1 class="text-center mb-2 text-lg">
      Input for Camera
      <hr />
    </h1>
    <div class="">
      <div class="flex justify-between">
        <label class="my-auto mr-2" for="ip_address">IP-Address:</label>
        <input
          v-model="ip_address"
          id="ip_address"
          class="border border-gray-400 p-px m-px rounded"
          type="text"
        />
      </div>
      <div class="flex justify-between">
        <label class="my-auto mr-2" for="username">Username:</label>
        <input
          v-model="username"
          id="username"
          class="border border-gray-400 p-px m-px rounded"
          type="text"
        />
      </div>
      <div class="flex justify-between">
        <label class="my-auto" mr-2 for="password">Password:</label>
        <input
          v-model="password"
          id="password"
          class="border border-gray-400 p-px m-px rounded"
          type="password"
        />
      </div>
    </div>
    <div class="my-2 flex justify-between">
      <div class="grow"></div>
      <button
        class="bg-blue-500 text-white rounded border border-black mr-1 w-1/2"
        @click="initCamera"
      >
        bestätigen
      </button>
      <button
        class="bg-gray-400 text-white rounded border border-black w-1/2"
        @click="closeModal"
      >
        abbrechen
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CameraModal",
  data() {
    return {
      ip_address: "",
      username: "",
      password: "",
    };
  },
  methods: {
    initCamera() {
      if (this.ip_address != "" && this.username != "" && this.password != "") {
        axios
          .post("cameras/init", {
            ip_address: this.ip_address,
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            if (response.data[1] == "camera found") {
              alert("camera already exists");
              this.ip_address = "";
              this.username = "";
              this.password = "";
              this.closeModal();
            }
          });
      } else {
        alert("fields are empty");
      }
    },
    closeModal() {
      console.log("emit(closeModal)");
      this.$emit("closeModal");
    },
  },
};
</script>
