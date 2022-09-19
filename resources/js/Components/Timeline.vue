<template>
  <div class="border border-black bg-gray-100 rounded-lg w-full h-full p-1">
    <div class="flex">
      <select v-model="date" class="mb-1 rounded" @change="getEvents()">
        <option
          v-for="(days, index) in eventDays"
          :key="'days' + index"
          :value="days"
        >
          {{ days }}
        </option>
      </select>
      <label v-if="this.events" class="m-auto">
        Events found: {{ events.length }}
      </label>
    </div>
    <hr class="border-black" />
    <div class="grid grid-cols-2 w-full h-96">
      <div class="bg-gray-200 w-full overflow-y-scroll overflow-x-hidden">
        <Event
          v-for="event in events"
          :event="event"
          :key="event + '_' + event.camera_id + '_' + event.id"
        />
      </div>
      <div class="bg-gray-200 w-full overflow-hidden border border-black">
        <div class="flex flex-col justify-between h-12  bg-green-200 ">
          <!-- <VideoPlayer :camera="null" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Event from "@/Components/Event.vue";
import VideoPlayer from "./VideoPlayer.vue";
export default {
  name: "Timeline",
  components: {
    Event,
    VideoPlayer,
  },
  data() {
    return {
      date: null,
      events: null,
      eventDays: null,
    };
  },
  methods: {
    getEvents() {
      axios
        .get(`events${this.date ? "?date=" + this.date : ""}`)
        .then((response) => {
          this.events = response.data[1].reverse();
          console.log(`events${this.date ? "?date=" + this.date : ""}`);
        });
    },
    getEventDays() {
      axios.get(`events/names`).then((response) => {
        this.date = response.data[0];
        this.eventDays = response.data;
      });
    },
  },
  created() {
    this.getEventDays();
    this.getEvents();
    // this.date = new Date().toISOString().split("T")[0];
    // this.date = this.eventDays[0];
  },
};
</script>

<style>
</style>
