<script setup>
import { onMounted, ref, computed } from 'vue';

const props = defineProps({
  calendarIds: {
    type: String,
    required: true,
  },
});
const calendarIdString = computed(() => props.calendarIds.split(',').map((id, index) => (index !== 0 ? '&' : '') + `calendarId=${id}`).join(''));
const data = ref({});

onMounted(async () => {
  data.value = await fetch(`https://cve-events.deno.dev/?${calendarIdString.value}&timeMin=${new Date().toISOString()}`).then(res => res.json());
});
const calendars = computed(() => Object.values(data.value));  
const events = computed(() => calendars.value.map(calendar => calendar.items).flat().sort((a, b) => new Date(a.start.date) - new Date(b.start.date)));
</script>

<template>
  <section class="event-list" v-if="calendarIdString">
    <template v-if="events.length">
      <event-item  v-for="event of events" :key="event.id" :event="event" />
    </template>
    <div>
      <p v-if="!events.length">No events found</p>
    </div>
  </section>
  <p v-else>
    No calendar IDs provided
  </p>
</template>

<style scoped>
.event-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>