<script setup>
import Event from './Event.vue';

import { onMounted, ref, computed } from 'vue';
const calendarIds = ["2m2nfvbcmbfi6t22qrchp89abk@group.calendar.google.com","0bd46055c48039d805a0d146505ad2892ac67ccf5f14943edb3357cb78b36946@group.calendar.google.com","ovk3u4382u0pnu7s06ljmkjhvc@group.calendar.google.com"];
const calendarIdString = calendarIds.map((id, index) => index !== 0 && '&' + `calendarId=${id}`).join('');
const data = ref({});

onMounted(async () => {
  data.value = await fetch(`https://cve-events.deno.dev/?${calendarIdString}&timeMin=${new Date().toISOString()}`).then(res => res.json());
});
const calendars = computed(() => Object.values(data.value));
const events = computed(() => calendars.value.map(calendar => calendar.items).flat().sort((a, b) => new Date(a.start.date) - new Date(b.start.date)));
</script>

<template>
  <section>
    <event v-for="event of events" :key="event.id" :event="event" />
  </section>
</template>

<style scoped>
</style>
