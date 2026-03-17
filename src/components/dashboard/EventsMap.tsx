"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { MockEvent } from "@/lib/mock-events";

const eventIcon = L.divIcon({
  className: "",
  html: `<div style="width:28px;height:28px;background:#22c55e;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

function FlyToEvent({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1 });
    }
  }, [map, position]);
  return null;
}

interface EventsMapProps {
  center: [number, number];
  userPosition: [number, number] | null;
  events: MockEvent[];
  flyTo: [number, number] | null;
  translations: Record<string, string>;
}

export default function EventsMap({ center, userPosition, events, flyTo, translations }: EventsMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userPosition && (
        <CircleMarker
          center={userPosition}
          radius={10}
          pathOptions={{ color: "#22c55e", fillColor: "#22c55e", fillOpacity: 0.4, weight: 3 }}
        />
      )}

      {events.map((evt) => (
        <Marker key={evt.id} position={[evt.lat, evt.lng]} icon={eventIcon}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold text-neutral-900">{translations[evt.titleKey] ?? evt.titleKey}</p>
              <p className="text-neutral-500">{evt.date} &middot; {evt.time}</p>
              <span className="inline-block mt-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 capitalize">
                {translations[evt.category] ?? evt.category}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}

      <FlyToEvent position={flyTo} />
    </MapContainer>
  );
}
