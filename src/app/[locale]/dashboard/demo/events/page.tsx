"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { MapPin, Loader2, Navigation } from "lucide-react";
import { generateMockEvents } from "@/lib/mock-events";

const EventsMap = dynamic(() => import("@/components/dashboard/EventsMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center rounded-2xl bg-neutral-100">
      <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
    </div>
  ),
});

const FALLBACK: [number, number] = [-34.6037, -58.3816];

const categoryStyles: Record<string, string> = {
  workshop: "bg-primary/10 text-primary",
  meetup: "bg-blue-100 text-blue-600",
  conference: "bg-purple-100 text-purple-600",
  webinar: "bg-yellow-100 text-yellow-600",
};

export default function EventsPage() {
  const t = useTranslations("dashboard");

  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [locationStatus, setLocationStatus] = useState<"prompt" | "loading" | "granted" | "denied">("prompt");
  const [locationRequested, setLocationRequested] = useState(false);
  const [flyTo, setFlyTo] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!locationRequested) return;
    setLocationStatus("loading");
    if (!navigator.geolocation) {
      setUserPosition(FALLBACK);
      setLocationStatus("denied");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        setLocationStatus("granted");
      },
      () => {
        setUserPosition(FALLBACK);
        setLocationStatus("denied");
      },
      { timeout: 10000 }
    );
  }, [locationRequested]);

  function handleSkipLocation() {
    setUserPosition(FALLBACK);
    setLocationStatus("denied");
  }

  const center = userPosition ?? FALLBACK;
  const events = useMemo(() => generateMockEvents(center[0], center[1]), [center[0], center[1]]);

  const translations: Record<string, string> = {};
  const keys = [
    "event1", "event2", "event3", "event4", "event5", "event6", "event7", "event8",
    "workshop", "meetup", "conference", "webinar",
  ];
  for (const k of keys) {
    translations[k] = t(k);
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-heading text-neutral-900">
            {t("eventsNearYou")}
          </h1>
          <p className="text-sm text-neutral-500">{t("eventsDescription")}</p>
        </div>
      </div>

      {locationStatus === "prompt" && (
        <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Navigation className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                {t("locationPromptTitle")}
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                {t("locationPromptDescription")}
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setLocationRequested(true)}
                  className="cursor-pointer rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  {t("enableLocation")}
                </button>
                <button
                  onClick={handleSkipLocation}
                  className="cursor-pointer rounded-full bg-neutral-100 px-4 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-200"
                >
                  {t("skipLocation")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {locationStatus === "loading" && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">
          <Loader2 className="h-4 w-4 animate-spin" />
          {t("loadingLocation")}
        </div>
      )}

      {locationStatus === "denied" && (
        <div className="mb-4 rounded-xl bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
          {t("locationDenied")}
        </div>
      )}

      {/* Map */}
      <div className="h-[65vh] overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
        {userPosition && (
          <EventsMap
            center={center}
            userPosition={locationStatus === "granted" ? userPosition : null}
            events={events}
            flyTo={flyTo}
            translations={translations}
          />
        )}
      </div>

      {/* Event cards */}
      <h2 className="mb-4 mt-8 text-xl font-semibold font-heading text-neutral-900">
        {t("upcomingEvents")}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${categoryStyles[evt.category]}`}
            >
              {t(evt.category)}
            </span>
            <h3 className="mt-3 text-sm font-semibold text-neutral-900">
              {t(evt.titleKey)}
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              {evt.date} &middot; {evt.time}
            </p>
            <button
              onClick={() => setFlyTo([evt.lat, evt.lng])}
              className="mt-3 cursor-pointer rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-dark"
            >
              {t("viewOnMap")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
