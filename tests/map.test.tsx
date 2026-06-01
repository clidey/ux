import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

vi.mock('react-map-gl/maplibre', () => ({
    __esModule: true,
    default: React.forwardRef(({children}: any, ref: any) => (
        <div data-testid="map-gl" ref={ref}>{children}</div>
    )),
    Marker: ({children, latitude, longitude}: any) => (
        <div data-testid="map-marker" data-lat={latitude} data-lng={longitude}>
            {children}
        </div>
    ),
    Source: ({children, id}: any) => (
        <div data-testid={`source-${id}`}>{children}</div>
    ),
    Layer: ({id}: any) => (
        <div data-testid={`layer-${id}`} />
    ),
    NavigationControl: () => <div data-testid="nav-control" />,
    ScaleControl: () => <div data-testid="scale-control" />,
}));

vi.mock('maplibre-gl', () => ({__esModule: true}));

import {
    MapContainer,
    MapMarker,
    MapLine,
    MapArc,
    MapPolygon,
    MapCircleLayer,
    MapHeatmap,
} from '@/components/ui/map';
import type {MapConfig} from '@/components/ui/map';

const testConfig: MapConfig = {
    primary: {label: 'Primary', color: '#ff0000'},
    secondary: {label: 'Secondary', color: '#0000ff'},
};

describe('MapContainer', () => {
    it('renders with data-slot="map"', () => {
        const {container} = render(
            <MapContainer config={testConfig}>
                <MapMarker latitude={40} longitude={-74} />
            </MapContainer>
        );
        expect(container.querySelector('[data-slot="map"]')).toBeInTheDocument();
    });

    it('renders the MapGL component', () => {
        render(
            <MapContainer config={testConfig}>
                <MapMarker latitude={40} longitude={-74} />
            </MapContainer>
        );
        expect(screen.getByTestId('map-gl')).toBeInTheDocument();
    });

    it('shows navigation control by default', () => {
        render(
            <MapContainer config={testConfig}>
                <MapMarker latitude={40} longitude={-74} />
            </MapContainer>
        );
        expect(screen.getByTestId('nav-control')).toBeInTheDocument();
    });

    it('hides navigation control when showNavigation=false', () => {
        render(
            <MapContainer config={testConfig} showNavigation={false}>
                <MapMarker latitude={40} longitude={-74} />
            </MapContainer>
        );
        expect(screen.queryByTestId('nav-control')).not.toBeInTheDocument();
    });

    it('shows scale control when showScale=true', () => {
        render(
            <MapContainer config={testConfig} showScale={true}>
                <MapMarker latitude={40} longitude={-74} />
            </MapContainer>
        );
        expect(screen.getByTestId('scale-control')).toBeInTheDocument();
    });

    it('accepts custom className', () => {
        const {container} = render(
            <MapContainer config={testConfig} className="h-[500px]">
                <MapMarker latitude={40} longitude={-74} />
            </MapContainer>
        );
        expect(container.querySelector('[data-slot="map"]')).toHaveClass('h-[500px]');
    });
});

describe('MapMarker', () => {
    it('renders a marker at the correct coordinates', () => {
        render(
            <MapContainer config={testConfig}>
                <MapMarker latitude={40.7} longitude={-74.0} />
            </MapContainer>
        );
        const marker = screen.getByTestId('map-marker');
        expect(marker).toHaveAttribute('data-lat', '40.7');
        expect(marker).toHaveAttribute('data-lng', '-74');
    });

    it('renders a label when provided', () => {
        render(
            <MapContainer config={testConfig}>
                <MapMarker latitude={40.7} longitude={-74.0} label="NYC" />
            </MapContainer>
        );
        expect(screen.getByText('NYC')).toBeInTheDocument();
    });

    it('uses color from configKey', () => {
        const {container} = render(
            <MapContainer config={testConfig}>
                <MapMarker latitude={40.7} longitude={-74.0} configKey="primary" />
            </MapContainer>
        );
        const dot = container.querySelector('.rounded-full');
        expect(dot).toHaveStyle({backgroundColor: '#ff0000'});
    });

    it('renders custom children instead of default dot', () => {
        render(
            <MapContainer config={testConfig}>
                <MapMarker latitude={40.7} longitude={-74.0}>
                    <span data-testid="custom">Custom</span>
                </MapMarker>
            </MapContainer>
        );
        expect(screen.getByTestId('custom')).toBeInTheDocument();
    });
});

describe('MapLine', () => {
    it('renders a source and layer for the line', () => {
        render(
            <MapContainer config={testConfig}>
                <MapLine
                    coordinates={[[-74, 40], [-87, 41]]}
                    color="#purple"
                />
            </MapContainer>
        );
        const sources = document.querySelectorAll('[data-testid^="source-source-line"]');
        expect(sources.length).toBeGreaterThan(0);
    });
});

describe('MapArc', () => {
    it('renders a source and layer for the arc', () => {
        render(
            <MapContainer config={testConfig}>
                <MapArc from={[-74, 40]} to={[2, 48]} />
            </MapContainer>
        );
        const sources = document.querySelectorAll('[data-testid^="source-source-arc"]');
        expect(sources.length).toBeGreaterThan(0);
    });
});

describe('MapPolygon', () => {
    it('renders fill and stroke layers', () => {
        render(
            <MapContainer config={testConfig}>
                <MapPolygon
                    coordinates={[[[-74, 40], [-87, 41], [-95, 29], [-74, 40]]]}
                />
            </MapContainer>
        );
        const sources = document.querySelectorAll('[data-testid^="source-source-polygon"]');
        expect(sources.length).toBeGreaterThan(0);
    });
});

describe('MapCircleLayer', () => {
    it('renders a circle layer for points', () => {
        render(
            <MapContainer config={testConfig}>
                <MapCircleLayer
                    points={[
                        {latitude: 40, longitude: -74, radius: 8},
                        {latitude: 41, longitude: -87, radius: 10},
                    ]}
                />
            </MapContainer>
        );
        const sources = document.querySelectorAll('[data-testid^="source-source-circle"]');
        expect(sources.length).toBeGreaterThan(0);
    });
});

describe('MapHeatmap', () => {
    it('renders a heatmap layer', () => {
        render(
            <MapContainer config={testConfig}>
                <MapHeatmap
                    points={[
                        {latitude: 40, longitude: -74, weight: 1},
                        {latitude: 41, longitude: -87, weight: 0.5},
                    ]}
                />
            </MapContainer>
        );
        const sources = document.querySelectorAll('[data-testid^="source-source-heatmap"]');
        expect(sources.length).toBeGreaterThan(0);
    });
});
