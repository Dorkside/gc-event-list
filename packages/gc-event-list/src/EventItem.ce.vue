<script setup>
import { computed } from 'vue'
const props = defineProps(['event'])

const start = computed(() => new Date(props.event.start.date))
const end = computed(() => new Date(props.event.end.date))

const isSingleDay = computed(() => end.value.getTime() - start.value.getTime() <= 86400000)

const saturations = {
  "Régates": "250deg"
};

const saturation = computed(() => saturations[props.event.organizer.displayName] || "0deg");
</script>

<template>
  <article class="event">
    <div class="date-frame">
      <h5>
        {{ start.toLocaleString('default', { month: 'short' }) }}
      </h5>
      <h4 class="date">
        {{ start.getDate() }}
      </h4>
      <h5 v-if="!isSingleDay" class="end-date">
        →{{ end.toLocaleDateString('default', { month: 'short', day: 'numeric' }) }}
      </h5>
    </div>
    <div class="content-frame">
      <h3 v-if="event.summary" class="title">
        {{ event.summary }}
      </h3>
      <p v-if="event.description">{{ event.description }}</p>
      <p v-if="event.location">
        {{ event.location }}
      </p>
    </div>
    <h5 class="type-frame" v-if="event.organizer.displayName">
      {{ event.organizer.displayName }}
    </h5>
  </article>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins:wght@700&display=swap');

h3,
h4,
h5 {
  font-family: 'Poppins', sans-serif;
  margin: 0;
}
p {
  font-family: 'Open Sans', sans-serif;
  margin: 0;
}
.date-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  margin-right: 1rem;
  text-transform: uppercase;
  width: 100px;
  padding: 8px;
}
.date-frame .date {
  font-size: 2rem;
  margin: -12px 0;
}
.date-frame .end-date {
  color: #999;
}
.content-frame {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  color: white;
  padding: 8px;
}
.content-frame .title {
  font-size: 1.5rem;
  margin-bottom: 8px;
  text-transform: uppercase;
}
.event {
  padding: 4px;
  background: hsl(v-bind(saturation), 50%, 50%);
  display: flex;
  position: relative;
}
.event:not(:last-child) {
  margin-bottom: 4px;
}
.type-frame {
  position: absolute;
  top: 8px;
  right: 8px;
  color: white;
  opacity: 0.3;
}
</style>
