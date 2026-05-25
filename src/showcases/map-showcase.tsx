import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapContainer, MapMarker, MapLine, MapArc, MapPolygon, MapCircleLayer, MapHeatmap, type MapConfig } from "@/components/ui/map"
import { Separator } from "@/components/ui/separator"

const citiesConfig = {
  primary: { label: "Major City", color: "#ef4444" },
  secondary: { label: "Secondary City", color: "#3b82f6" },
  route: { label: "Route", color: "#8b5cf6" },
  region: { label: "Region", color: "#10b981" },
} satisfies MapConfig

const cities = [
  { name: "New York", latitude: 40.7128, longitude: -74.006 },
  { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
  { name: "Chicago", latitude: 41.8781, longitude: -87.6298 },
  { name: "Houston", latitude: 29.7604, longitude: -95.3698 },
  { name: "Phoenix", latitude: 33.4484, longitude: -112.074 },
]

const routeCoordinates: [number, number][] = [
  [-74.006, 40.7128],
  [-87.6298, 41.8781],
  [-95.3698, 29.7604],
  [-112.074, 33.4484],
  [-118.2437, 34.0522],
]

const triangleCoordinates: [number, number][][] = [[
  [-74.006, 40.7128],
  [-87.6298, 41.8781],
  [-95.3698, 29.7604],
  [-74.006, 40.7128],
]]

const heatmapPoints = Array.from({ length: 100 }, () => ({
  latitude: 37 + (Math.random() - 0.5) * 10,
  longitude: -95 + (Math.random() - 0.5) * 30,
  weight: Math.random(),
}))

export function MapShowcase() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Maps</h2>
        <p className="text-muted-foreground">
          Interactive maps with markers, lines, polygons, heatmaps, and globe projection. Built on MapLibre GL.
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Markers</CardTitle>
          <CardDescription>
            Place points on the map to highlight locations. Supports custom colors, sizes, and labels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MapContainer config={citiesConfig} className="h-[350px]">
            {cities.map((city, i) => (
              <MapMarker
                key={city.name}
                latitude={city.latitude}
                longitude={city.longitude}
                color={i === 0 ? "#ef4444" : "#3b82f6"}
                size={i === 0 ? 16 : 12}
                label={city.name}
              />
            ))}
          </MapContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lines & Routes</CardTitle>
          <CardDescription>
            Draw lines connecting points. Useful for routes, paths, and connections between locations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MapContainer config={citiesConfig} className="h-[350px]">
            <MapLine
              coordinates={routeCoordinates}
              configKey="route"
              width={3}
            />
            {cities.map((city) => (
              <MapMarker
                key={city.name}
                latitude={city.latitude}
                longitude={city.longitude}
                configKey="primary"
                size={10}
              />
            ))}
          </MapContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Polygons & Regions</CardTitle>
          <CardDescription>
            Define areas with polygons. Great for highlighting regions, zones, or boundaries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MapContainer config={citiesConfig} className="h-[350px]">
            <MapPolygon
              coordinates={triangleCoordinates}
              configKey="region"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <MapMarker latitude={40.7128} longitude={-74.006} configKey="primary" label="NYC" />
            <MapMarker latitude={41.8781} longitude={-87.6298} configKey="primary" label="Chicago" />
            <MapMarker latitude={29.7604} longitude={-95.3698} configKey="primary" label="Houston" />
          </MapContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Circle Layer</CardTitle>
          <CardDescription>
            Render many points efficiently using a circle layer. Supports variable radius per point.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MapContainer config={citiesConfig} className="h-[350px]">
            <MapCircleLayer
              points={cities.map((c, i) => ({
                latitude: c.latitude,
                longitude: c.longitude,
                radius: 8 + i * 3,
              }))}
              configKey="secondary"
              opacity={0.7}
            />
          </MapContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Heatmap</CardTitle>
          <CardDescription>
            Visualize density of points with a heatmap layer. Intensity is based on point weight.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MapContainer config={citiesConfig} className="h-[350px]">
            <MapHeatmap
              points={heatmapPoints}
              radius={25}
              intensity={0.8}
            />
          </MapContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Arc Lines (Flight Routes)</CardTitle>
          <CardDescription>
            Curved arcs that bow outward like airplane routes. Each arc starts from one city and "flies" to the next.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MapContainer
            config={citiesConfig}
            projection="globe"
            mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            initialViewState={{ latitude: 30, longitude: -30, zoom: 1.5 }}
            className="h-[400px]"
          >
            <MapArc from={[-74.006, 40.7128]} to={[2.3522, 48.8566]} color="#f59e0b" width={2.5} height={0.4} />
            <MapArc from={[-74.006, 40.7128]} to={[139.6917, 35.6895]} color="#ef4444" width={2.5} height={0.6} />
            <MapArc from={[2.3522, 48.8566]} to={[77.209, 28.6139]} color="#10b981" width={2.5} height={0.5} />
            <MapArc from={[-118.2437, 34.0522]} to={[151.2093, -33.8688]} color="#8b5cf6" width={2.5} height={0.5} />
            <MapArc from={[-74.006, 40.7128]} to={[-118.2437, 34.0522]} color="#3b82f6" width={2.5} height={0.4} />
            <MapMarker latitude={40.7128} longitude={-74.006} color="#ffffff" size={8} label="NYC" />
            <MapMarker latitude={48.8566} longitude={2.3522} color="#ffffff" size={8} label="Paris" />
            <MapMarker latitude={35.6895} longitude={139.6917} color="#ffffff" size={8} label="Tokyo" />
            <MapMarker latitude={28.6139} longitude={77.209} color="#ffffff" size={8} label="Delhi" />
            <MapMarker latitude={34.0522} longitude={-118.2437} color="#ffffff" size={8} label="LA" />
            <MapMarker latitude={-33.8688} longitude={151.2093} color="#ffffff" size={8} label="Sydney" />
          </MapContainer>
        </CardContent>
      </Card>
    </div>
  )
}
