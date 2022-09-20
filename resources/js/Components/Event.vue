<template>
  <div class="ml-1 flex w-full">
    <div class="w-2 bg-gray-400 h-24 min-w-fit"></div>
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
      :class="selectedEvent"
    ></div>
    <div
      @click="clickEvent"
      class="
        bg-green-300
        h-fit
        min-w-fit
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
      :class="selectedEvent"
    >
      <label class="mx-2 font-bold text-left"
        >Zeitpunkt: {{ showEventTimestamp }}</label
      >

      <label class="mx-2 text-left">Camera-ID: {{ showEventCamera }} </label>

      <label class="mx-2 text-left">Eventtyp-ID: {{ showEventType }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Event",
  props: {
    event: {
      type: Object,
      required: true,
    },
    selected: {
      type: Object,
      required: false,
    },
  },
  methods: {
    clickEvent() {
      this.$emit("clickedEvent", this.event);
    },
  },
  computed: {
    showEventTimestamp() {
      return this.event.created_at.split(".")[0].split("T")[1];
    },
    showEventCamera() {
      return this.event.camera_id;
    },
    showEventType() {
      return this.event.eventtype_id;
    },
    selectedEvent() {
      return this.selected?.id == this.event.id ? "bg-green-400" : "";
    },
  },
};
</script>
