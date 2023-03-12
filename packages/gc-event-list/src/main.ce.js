// This file is used to define the custom elements for the component
import { defineCustomElement } from 'vue'
import EventList from './EventList.ce.vue'
import EventItem from './EventItem.ce.vue'

const EventListElement = defineCustomElement(EventList)
const EventItemElement = defineCustomElement(EventItem)

export const register = () => {
  if(customElements.get('event-list') === undefined) {
    customElements.define('event-list', EventListElement)
    customElements.define('event-item', EventItemElement)
  }
}

try {
  window.addEventListener('DOMContentLoaded', () => {
    register()
  }, {once: true})
} catch (e) {
  console.error(e)
}


