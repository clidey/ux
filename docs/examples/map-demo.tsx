/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import { useState } from "react";
import * as UX from "@clidey/ux";
import mapStyle from "./offline-map-style.json";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import { setWorkerUrl } from "maplibre-gl";
import { Demo, Status } from "./demo-shell";
const locations = [
  { name: "New York", latitude: 40.71, longitude: -74.01 },
  { name: "London", latitude: 51.51, longitude: -0.13 },
  { name: "Singapore", latitude: 1.35, longitude: 103.82 },
];
export function MapPreview() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("");
  const [route, setRoute] = useState(true);
  return (
    <Demo hint="Load the map, drag to pan, zoom, and select a marker. The Natural Earth basemap is bundled locally.">
      {loaded ? (
        <>
          <div className="ux-demo-row">
            <UX.Switch id="map-routes" checked={route} onCheckedChange={setRoute} />
            <UX.Label htmlFor="map-routes">Show connections</UX.Label>
          </div>
          <div className="ux-demo-map">
            <UX.MapContainer
              className="ux-demo-map-canvas"
              config={{ team: { color: "#8ab4ff" } }}
              mapStyle={mapStyle as UX.MapContainerProps["mapStyle"]}
              initialViewState={{ latitude: 24, longitude: 12, zoom: 0.7 }}
              showNavigation
            >
              {locations.map((place) => (
                <UX.MapMarker
                  key={place.name}
                  latitude={place.latitude}
                  longitude={place.longitude}
                  label={place.name}
                  configKey="team"
                  onClick={() => setSelected(place.name)}
                />
              ))}
              {route && (
                <>
                  <UX.MapArc from={[-74.01, 40.71]} to={[-0.13, 51.51]} configKey="team" />
                  <UX.MapArc from={[-0.13, 51.51]} to={[103.82, 1.35]} configKey="team" />
                </>
              )}
            </UX.MapContainer>
          </div>
          <Status>{selected ? "Selected: " + selected : "Select a team location"}</Status>
        </>
      ) : (
        <div className="ux-demo-map-start">
          <UX.CatalogIcon name="globe" size={42} />
          <h3>A world of connections.</h3>
          <p>Try the actual MapLibre component with no API key or external tile requests.</p>
          <UX.Button
            onClick={() => {
              try {
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
                if (!context) {
                  setError(
                    "WebGL is unavailable in this browser. Try a browser with hardware acceleration enabled.",
                  );
                  return;
                }
                setWorkerUrl(workerUrl);
                setLoaded(true);
              } catch {
                setError("This browser cannot create a WebGL context.");
              }
            }}
          >
            Load interactive map
          </UX.Button>
          {error && <Status>{error}</Status>}
        </div>
      )}
    </Demo>
  );
}
