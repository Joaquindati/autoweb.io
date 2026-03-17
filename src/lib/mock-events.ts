export interface MockEvent {
  id: string;
  titleKey: string;
  date: string;
  time: string;
  category: "workshop" | "meetup" | "conference" | "webinar";
  lat: number;
  lng: number;
}

const eventDefs: { titleKey: string; time: string; category: MockEvent["category"]; dayOffset: number; latOff: number; lngOff: number }[] = [
  { titleKey: "event1", time: "19:00", category: "workshop", dayOffset: 2, latOff: 0.008, lngOff: -0.012 },
  { titleKey: "event2", time: "18:30", category: "meetup", dayOffset: 5, latOff: -0.015, lngOff: 0.005 },
  { titleKey: "event3", time: "09:00", category: "conference", dayOffset: 8, latOff: 0.012, lngOff: 0.018 },
  { titleKey: "event4", time: "14:00", category: "webinar", dayOffset: 12, latOff: -0.006, lngOff: -0.02 },
  { titleKey: "event5", time: "17:00", category: "workshop", dayOffset: 16, latOff: 0.02, lngOff: 0.008 },
  { titleKey: "event6", time: "19:30", category: "meetup", dayOffset: 20, latOff: -0.018, lngOff: 0.015 },
  { titleKey: "event7", time: "10:00", category: "conference", dayOffset: 24, latOff: 0.005, lngOff: -0.016 },
  { titleKey: "event8", time: "16:00", category: "workshop", dayOffset: 28, latOff: -0.01, lngOff: 0.01 },
];

export function generateMockEvents(centerLat: number, centerLng: number): MockEvent[] {
  const now = new Date();
  return eventDefs.map((def, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() + def.dayOffset);
    return {
      id: `evt-${i}`,
      titleKey: def.titleKey,
      date: date.toISOString().split("T")[0],
      time: def.time,
      category: def.category,
      lat: centerLat + def.latOff,
      lng: centerLng + def.lngOff,
    };
  });
}
