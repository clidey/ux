/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import MapGL, {
  Marker as MapGLMarker,
  Source,
  Layer,
  NavigationControl,
  ScaleControl,
  type MapRef,
  type ViewState,
} from "react-map-gl/maplibre"
import type { LayerSpecification } from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

import { cn } from "@/lib/utils"

export type MapConfig = {
  [k in string]: {
    label?: React.ReactNode
    color?: string
  }
}

type MapContextProps = {
  config: MapConfig
}

const MapContext = React.createContext<MapContextProps | null>(null)

function useMap() {
  const context = React.useContext(MapContext)
  if (!context) {
    throw new Error("useMap must be used within a <MapContainer />")
  }
  return context
}

export type MapProjection = "mercator" | "globe"

export interface MapContainerProps extends Omit<React.ComponentProps<"div">, "style"> {
  config: MapConfig
  initialViewState?: Partial<ViewState> & { latitude: number; longitude: number; zoom: number }
  projection?: MapProjection
  mapStyle?: string
  interactive?: boolean
  showNavigation?: boolean
  showScale?: boolean
  mapRef?: React.Ref<MapRef>
}

const DEFAULT_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
const DARK_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"

function MapContainer({
  className,
  children,
  config,
  initialViewState = { latitude: 39.8283, longitude: -98.5795, zoom: 3 },
  projection = "mercator",
  mapStyle,
  interactive = true,
  showNavigation = true,
  showScale = false,
  mapRef,
  ...props
}: MapContainerProps) {
  const resolvedStyle = mapStyle ?? (
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? DARK_STYLE
      : DEFAULT_STYLE
  )

  return (
    <MapContext.Provider value={{ config }}>
      <div
        data-slot="map"
        className={cn("relative h-[400px] w-full rounded-lg overflow-hidden border", className)}
        {...props}
      >
        <MapGL
          ref={mapRef}
          initialViewState={initialViewState}
          mapStyle={resolvedStyle}
          interactive={interactive}
          projection={projection}
          style={{ width: "100%", height: "100%" }}
        >
          {showNavigation && <NavigationControl position="top-right" />}
          {showScale && <ScaleControl position="bottom-left" />}
          {children}
        </MapGL>
      </div>
    </MapContext.Provider>
  )
}

export interface MapMarkerProps {
  latitude: number
  longitude: number
  color?: string
  size?: number
  label?: string
  configKey?: string
  children?: React.ReactNode
  onClick?: () => void
}

function MapMarker({
  latitude,
  longitude,
  color,
  size = 12,
  label,
  configKey,
  children,
  onClick,
}: MapMarkerProps) {
  const { config } = useMap()
  const resolvedColor = color ?? (configKey ? config[configKey]?.color : undefined) ?? "var(--chart-1)"
  const resolvedLabel = label ?? (configKey ? config[configKey]?.label : undefined)

  return (
    <MapGLMarker latitude={latitude} longitude={longitude} onClick={onClick}>
      {children ?? (
        <div className="flex flex-col items-center gap-0.5">
          <div
            className="rounded-full border-2 border-white shadow-md"
            style={{
              width: size,
              height: size,
              backgroundColor: resolvedColor,
            }}
          />
          {resolvedLabel && (
            <span className="text-[10px] font-medium text-foreground whitespace-nowrap">
              {typeof resolvedLabel === "string" ? resolvedLabel : resolvedLabel}
            </span>
          )}
        </div>
      )}
    </MapGLMarker>
  )
}

export interface MapLineProps {
  coordinates: [longitude: number, latitude: number][]
  color?: string
  width?: number
  configKey?: string
  dashed?: boolean
}

function MapLine({
  coordinates,
  color,
  width = 2,
  configKey,
  dashed = false,
}: MapLineProps) {
  const { config } = useMap()
  const resolvedColor = color ?? (configKey ? config[configKey]?.color : undefined) ?? "var(--chart-2)"
  const id = React.useId().replace(/:/g, "")

  const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates,
    },
  }

  const layerStyle: LayerSpecification = {
    id: `line-${id}`,
    type: "line",
    source: `source-line-${id}`,
    paint: {
      "line-color": resolvedColor,
      "line-width": width,
      ...(dashed ? { "line-dasharray": [2, 2] } : {}),
    },
  }

  return (
    <Source id={`source-line-${id}`} type="geojson" data={geojson}>
      <Layer {...layerStyle} />
    </Source>
  )
}

export interface MapPolygonProps {
  coordinates: [longitude: number, latitude: number][][]
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  configKey?: string
}

function MapPolygon({
  coordinates,
  fillColor,
  fillOpacity = 0.3,
  strokeColor,
  strokeWidth = 2,
  configKey,
}: MapPolygonProps) {
  const { config } = useMap()
  const resolvedFillColor = fillColor ?? (configKey ? config[configKey]?.color : undefined) ?? "var(--chart-3)"
  const resolvedStrokeColor = strokeColor ?? resolvedFillColor
  const id = React.useId().replace(/:/g, "")

  const geojson: GeoJSON.Feature<GeoJSON.Polygon> = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates,
    },
  }

  const fillLayer: LayerSpecification = {
    id: `polygon-fill-${id}`,
    type: "fill",
    source: `source-polygon-${id}`,
    paint: {
      "fill-color": resolvedFillColor,
      "fill-opacity": fillOpacity,
    },
  }

  const strokeLayer: LayerSpecification = {
    id: `polygon-stroke-${id}`,
    type: "line",
    source: `source-polygon-${id}`,
    paint: {
      "line-color": resolvedStrokeColor,
      "line-width": strokeWidth,
    },
  }

  return (
    <Source id={`source-polygon-${id}`} type="geojson" data={geojson}>
      <Layer {...fillLayer} />
      <Layer {...strokeLayer} />
    </Source>
  )
}

export interface MapCircleLayerProps {
  points: { latitude: number; longitude: number; radius?: number; properties?: Record<string, unknown> }[]
  color?: string
  opacity?: number
  configKey?: string
}

function MapCircleLayer({
  points,
  color,
  opacity = 0.6,
  configKey,
}: MapCircleLayerProps) {
  const { config } = useMap()
  const resolvedColor = color ?? (configKey ? config[configKey]?.color : undefined) ?? "var(--chart-4)"
  const id = React.useId().replace(/:/g, "")

  const geojson: GeoJSON.FeatureCollection<GeoJSON.Point> = {
    type: "FeatureCollection",
    features: points.map((p) => ({
      type: "Feature",
      properties: { radius: p.radius ?? 6, ...p.properties },
      geometry: {
        type: "Point",
        coordinates: [p.longitude, p.latitude],
      },
    })),
  }

  const layerStyle: LayerSpecification = {
    id: `circle-${id}`,
    type: "circle",
    source: `source-circle-${id}`,
    paint: {
      "circle-color": resolvedColor,
      "circle-radius": ["get", "radius"] as unknown as number,
      "circle-opacity": opacity,
    },
  }

  return (
    <Source id={`source-circle-${id}`} type="geojson" data={geojson}>
      <Layer {...layerStyle} />
    </Source>
  )
}

export interface MapHeatmapProps {
  points: { latitude: number; longitude: number; weight?: number }[]
  radius?: number
  intensity?: number
  configKey?: string
}

function MapHeatmap({
  points,
  radius = 20,
  intensity = 1,
}: MapHeatmapProps) {
  const id = React.useId().replace(/:/g, "")

  const geojson: GeoJSON.FeatureCollection<GeoJSON.Point> = {
    type: "FeatureCollection",
    features: points.map((p) => ({
      type: "Feature",
      properties: { weight: p.weight ?? 1 },
      geometry: {
        type: "Point",
        coordinates: [p.longitude, p.latitude],
      },
    })),
  }

  const layerStyle = {
    id: `heatmap-${id}`,
    type: "heatmap" as const,
    source: `source-heatmap-${id}`,
    paint: {
      "heatmap-weight": ["get", "weight"],
      "heatmap-intensity": intensity,
      "heatmap-radius": radius,
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0, "rgba(0,0,255,0)",
        0.2, "royalblue",
        0.4, "cyan",
        0.6, "lime",
        0.8, "yellow",
        1, "red",
      ],
    },
  } as unknown as LayerSpecification

  return (
    <Source id={`source-heatmap-${id}`} type="geojson" data={geojson}>
      <Layer {...layerStyle} />
    </Source>
  )
}

export interface MapArcProps {
  from: [longitude: number, latitude: number]
  to: [longitude: number, latitude: number]
  color?: string
  width?: number
  configKey?: string
  segments?: number
  /** Height of the arc bow (0-1). Higher = more curved. Default 0.5. */
  height?: number
}

function computeArcCoordinates(
  from: [number, number],
  to: [number, number],
  segments: number,
  height: number,
): [number, number][] {
  const toRad = (d: number) => (d * Math.PI) / 180

  const [lon1, lat1] = from
  const [lon2, lat2] = to

  const lat1R = toRad(lat1)
  const lon1R = toRad(lon1)
  const lat2R = toRad(lat2)
  const lon2R = toRad(lon2)

  const d = 2 * Math.asin(
    Math.sqrt(
      Math.pow(Math.sin((lat2R - lat1R) / 2), 2) +
      Math.cos(lat1R) * Math.cos(lat2R) * Math.pow(Math.sin((lon2R - lon1R) / 2), 2)
    )
  )

  if (d < 1e-10) return [from, to]

  // Perpendicular offset direction (rotate the midpoint->endpoint vector 90 degrees)
  const dx = lon2 - lon1
  const dy = lat2 - lat1
  const dist = Math.sqrt(dx * dx + dy * dy)
  // Normal perpendicular to the line (pointing "left" of from->to direction)
  const nx = -dy / dist
  const ny = dx / dist

  // Arc height scales with distance
  const arcHeight = height * dist * 0.3

  const points: [number, number][] = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    // Linear interpolation along the line
    const lngBase = lon1 + t * dx
    const latBase = lat1 + t * dy
    // Parabolic offset: peaks at t=0.5, zero at t=0 and t=1
    const offset = 4 * t * (1 - t) * arcHeight
    const lng = lngBase + offset * nx
    const lat = latBase + offset * ny
    points.push([lng, lat])
  }
  return points
}

function MapArc({
  from,
  to,
  color,
  width = 2,
  configKey,
  segments = 64,
  height = 0.5,
}: MapArcProps) {
  const { config } = useMap()
  const resolvedColor = color ?? (configKey ? config[configKey]?.color : undefined) ?? "var(--chart-2)"
  const id = React.useId().replace(/:/g, "")

  const coordinates = React.useMemo(
    () => computeArcCoordinates(from, to, segments, height),
    [from, to, segments, height]
  )

  const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates,
    },
  }

  const layerStyle: LayerSpecification = {
    id: `arc-${id}`,
    type: "line",
    source: `source-arc-${id}`,
    paint: {
      "line-color": resolvedColor,
      "line-width": width,
    },
  }

  return (
    <Source id={`source-arc-${id}`} type="geojson" data={geojson}>
      <Layer {...layerStyle} />
    </Source>
  )
}

export {
  MapContainer,
  MapMarker,
  MapLine,
  MapPolygon,
  MapCircleLayer,
  MapHeatmap,
  MapArc,
  useMap,
}
