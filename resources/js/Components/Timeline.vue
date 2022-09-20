<template>
  <div class="border border-black bg-gray-100 rounded-lg p-1">
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
      <label v-if="this.events" class="my-auto ml-20">
        Events found: {{ events.length }}
      </label>
    </div>
    <hr class="border-black" />
    <div class="flex w-full h-96 grow-0">
      <div class="bg-gray-200 w-1/2 overflow-y-scroll overflow-x-hidden py-1">
        <Event
          v-for="event in events"
          :selected="selectedEvent"
          :event="event"
          :key="'event_' + event.camera_id + '_' + event.id"
          @clickedEvent="getVideoSrc"
        />
      </div>
      <div class="w-1/2 bg-gray-200 border-l border-black flex">
        <div class="">
          <VideoPlayer :videoSrc="videoSrc" />
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
      videoSrc: null,
      selectedEvent: null,
    };
  },
  methods: {
    getVideoSrc(event) {
      this.selectedEvent = event;
      axios.get(`events/${event.id}`).then((response) => {
        this.videoSrc = response.data[0];
      });
    },
    getEvents() {
      axios
        .get(`events${this.date ? "?date=" + this.date : ""}`)
        .then((response) => {
          this.events = response.data[1].reverse();
        });
    },
    getEventDays() {
      axios.get(`events/dates`).then((response) => {
        this.date = response.data[0];
        this.eventDays = response.data;
        this.getEvents();
      });
    },
  },
  created() {
    this.getEventDays();
  },
};
</script>

