// hey
import { defineCustomElement } from 'vue'
import EventList from './EventList.ce.vue'
import EventItem from './EventItem.ce.vue'

const EventListElement = defineCustomElement(EventList)
const EventItemElement = defineCustomElement(EventItem)

export { EventListElement, EventItemElement }

export function register() {
  customElements.define('event-list', EventListElement)
  customElements.define('event-item', EventItemElement)  
}