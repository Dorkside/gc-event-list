// This file is used to define the custom elements for the component
import { defineCustomElement } from 'vue'
import EventList from './EventList.ce.vue'
import EventItem from './EventItem.ce.vue'

const EventListElement = defineCustomElement(EventList)
const EventItemElement = defineCustomElement(EventItem)

window.addEventListener('DOMContentLoaded', () => {
  customElements.define('event-list', EventListElement)
  customElements.define('event-item', EventItemElement)
}, {once: true})
