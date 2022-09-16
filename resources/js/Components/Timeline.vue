<template>
  <br />
  <div class="bg-gray-100 border rounded-lg">
    <div class="flex">
      <select v-model="date" class="mb-px rounded" @change="getEvents()">
        <option
          v-for="(days, index) in eventDays"
          :key="'days' + index"
          :value="days"
        >
          {{ days }}
        </option>
      </select>
      <label v-if="this.events" class="m-auto">
        {{ events.length }} Events found
      </label>
    </div>
    <div
      class="
        max-h-[25rem]
        min-h-[25rem]
        overflow-y-scroll
        border-t border-black
      "
    >
      <div class="my-2 pl-2 h-full flex border ">
        <div class="h-full w-2 ml-2 flex flex-col bg-gray-300 rounded-sm">
          <Event
            v-for="(event, index) in events"
            :key="'event' + index"
            :event="event"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Event from "@/Components/Event.vue";
export default {
  name: "Timeline",
  components: {
    Event,
  },
  data() {
    return {
      date: null,
      timePeriod: null,
      events: null,
      eventDays: null,
    };
  },
  methods: {
    getEvents() {
      axios
        .get(`events${this.date ? "?date=" + this.date : ""}`)
        .then((response) => {
          this.timePeriod = response.data[0];
          this.events = response.data[1].reverse();
          console.log(`events${this.date ? "?date=" + this.date : ""}`);
        });
    },
    getEventDays() {
      axios.get(`events/names`).then((response) => {
        this.eventDays = response.data;
      });
    },
  },
  created() {
    this.date = new Date().toISOString().split("T")[0];
    this.getEvents();
    this.getEventDays();
  },
};
</script>

<style>
</style>