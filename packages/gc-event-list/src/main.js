import { createApp } from 'vue'
import { defineCustomElement } from 'vue'
import App from './App.vue'
import EventList from './EventList.ce.vue'
import EventItem from './EventItem.ce.vue'

const EventListElement = defineCustomElement(EventList)
const EventItemElement = defineCustomElement(EventItem)

customElements.define('event-list', EventListElement)
customElements.define('event-item', EventItemElement)

createApp(App).mount('#app')