import { EventInput } from '@fullcalendar/react'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const test: EventInput[] = [
  {
    id: "1",
    title: 'All-day event',
    start: todayStr
  },
  {
    id: "2",
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]