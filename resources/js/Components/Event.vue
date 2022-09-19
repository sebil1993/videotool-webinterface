<template>
  <div class="ml-1 flex w-full">
    <div class="w-2 bg-gray-400 h-24"></div>
    <div
      class="
        bg-green-300
        h-4
        w-4
        my-auto
        border border-black
        -ml-3
        rounded-full
      "
    ></div>
    <div
      @mouseover="showArrow"
      class="
        bg-green-300
        h-fit
        w-1/2
        border border-black
        my-auto
        mx-2
        text-xs
        flex flex-col
        py-1
        rounded
        hover:translate-x-6
        duration-200
      "
    >
      <label class="ml-2 font-bold text-left"
        >Zeitpunkt: {{ showEventTimestamp(event) }}</label
      >

      <label class="ml-2 text-left"
        >Camera-ID: {{ showEventCamera(event) }}
      </label>

      <label class="ml-2 text-left"
        >Eventtyp-ID: {{ showEventType(event) }}</label
      >
    </div>
  </div>
  <!-- <div class="flex">
    <div
      class="bg-gray-400 w-5 h-5 my-auto -m-1.5 shrink-0 mr-1 rounded-full"
    ></div>
    <div
      class="
        bg-gray-400
        min-w-[15rem] min-h-[5rem]
        rounded-lg
        my-2
        text-center
      "
      :title="showEventTimestamp(event)"
      @click="clickevent"
    >
      <div class="flex flex-col justify-between">

      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: "Event",
  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  methods: {
    clickevent() {
      console.log(this.event.id, "clicked");
    },
    showEventTimestamp(event) {
      return event.created_at.split(".")[0].split("T")[1];
    },
    showEventCamera(event) {
      return event.camera_id;
    },
    showEventType(event) {
      return event.eventtype_id;
    },
  },
};
</script>
