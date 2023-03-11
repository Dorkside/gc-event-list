<script setup>
const calendarIds = [
  "2m2nfvbcmbfi6t22qrchp89abk@group.calendar.google.com",
  "0bd46055c48039d805a0d146505ad2892ac67ccf5f14943edb3357cb78b36946@group.calendar.google.com",
  "ovk3u4382u0pnu7s06ljmkjhvc@group.calendar.google.com"
].join(',');
</script>

<template>
  <event-list :calendar-ids="calendarIds" />
</template>