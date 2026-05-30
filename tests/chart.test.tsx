import {render, screen} from '@testing-library/react';
import {ChartContainer, ChartStyle, ChartLegendContent, ChartTooltipContent} from '@/components/ui/chart';
import type {ChartConfig} from '@/components/ui/chart';
import {describe, expect, it} from 'vitest';
import * as React from 'react';

const testConfig: ChartConfig = {
    desktop: {label: 'Desktop', color: '#ff0000'},
    mobile: {label: 'Mobile', color: '#00ff00'},
};

const themeConfig: ChartConfig = {
    revenue: {
        label: 'Revenue',
        theme: {light: '#111', dark: '#eee'},
    },
};

describe('ChartContainer', () => {
    it('renders with data-slot="chart"', () => {
        const {container} = render(
            <ChartContainer config={testConfig}>
                <svg><rect /></svg>
            </ChartContainer>
        );
        const chart = container.querySelector('[data-slot="chart"]');
        expect(chart).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const {container} = render(
            <ChartContainer config={testConfig} className="my-chart">
                <svg><rect /></svg>
            </ChartContainer>
        );
        const chart = container.querySelector('[data-slot="chart"]');
        expect(chart).toHaveClass('my-chart');
    });

    it('generates a data-chart id attribute', () => {
        const {container} = render(
            <ChartContainer config={testConfig}>
                <svg><rect /></svg>
            </ChartContainer>
        );
        const chart = container.querySelector('[data-slot="chart"]');
        expect(chart?.getAttribute('data-chart')).toMatch(/^chart-/);
    });

    it('uses custom id when provided', () => {
        const {container} = render(
            <ChartContainer config={testConfig} id="my-id">
                <svg><rect /></svg>
            </ChartContainer>
        );
        const chart = container.querySelector('[data-slot="chart"]');
        expect(chart?.getAttribute('data-chart')).toBe('chart-my-id');
    });
});

describe('ChartStyle', () => {
    it('renders a style element with CSS variables for color config', () => {
        const {container} = render(<ChartStyle id="test-chart" config={testConfig} />);
        const style = container.querySelector('style');
        expect(style).toBeInTheDocument();
        expect(style?.innerHTML).toContain('--color-desktop: #ff0000');
        expect(style?.innerHTML).toContain('--color-mobile: #00ff00');
    });

    it('renders theme-based colors with selectors', () => {
        const {container} = render(<ChartStyle id="test-chart" config={themeConfig} />);
        const style = container.querySelector('style');
        expect(style?.innerHTML).toContain('--color-revenue: #111');
        expect(style?.innerHTML).toContain('.dark');
        expect(style?.innerHTML).toContain('--color-revenue: #eee');
    });

    it('returns null when no color config exists', () => {
        const emptyConfig: ChartConfig = {item: {label: 'No Color'}};
        const {container} = render(<ChartStyle id="test-chart" config={emptyConfig} />);
        const style = container.querySelector('style');
        expect(style).not.toBeInTheDocument();
    });
});

describe('ChartTooltipContent', () => {
    it('returns null when not active', () => {
        const {container} = render(
            <ChartContainer config={testConfig}>
                <svg>
                    <foreignObject>
                        <ChartTooltipContent active={false} payload={[]} />
                    </foreignObject>
                </svg>
            </ChartContainer>
        );
        expect(container.querySelector('.border-border\\/50')).not.toBeInTheDocument();
    });

    it('returns null when payload is empty', () => {
        const {container} = render(
            <ChartContainer config={testConfig}>
                <svg>
                    <foreignObject>
                        <ChartTooltipContent active={true} payload={[]} />
                    </foreignObject>
                </svg>
            </ChartContainer>
        );
        expect(container.querySelector('.min-w-\\[8rem\\]')).not.toBeInTheDocument();
    });

    it('renders with data-slot="chart-tooltip-content" when active with payload', () => {
        const payload = [
            {dataKey: 'desktop', name: 'Desktop', value: 100, color: '#ff0000'},
        ];
        const {container} = render(
            <ChartContainer config={testConfig}>
                <svg>
                    <foreignObject>
                        <ChartTooltipContent active={true} payload={payload} />
                    </foreignObject>
                </svg>
            </ChartContainer>
        );
        const el = container.querySelector('[data-slot="chart-tooltip-content"]');
        expect(el).toBeInTheDocument();
    });
});

describe('ChartLegendContent', () => {
    it('returns null when payload is empty', () => {
        const {container} = render(
            <ChartContainer config={testConfig}>
                <svg>
                    <foreignObject>
                        <ChartLegendContent payload={[]} />
                    </foreignObject>
                </svg>
            </ChartContainer>
        );
        expect(container.querySelector('.flex.items-center.justify-center')).not.toBeInTheDocument();
    });

    it('renders legend items from payload', () => {
        const payload = [
            {dataKey: 'desktop', value: 'Desktop', color: '#ff0000'},
            {dataKey: 'mobile', value: 'Mobile', color: '#00ff00'},
        ];
        render(
            <ChartContainer config={testConfig}>
                <svg>
                    <foreignObject>
                        <ChartLegendContent payload={payload} />
                    </foreignObject>
                </svg>
            </ChartContainer>
        );
        expect(screen.getByText('Desktop')).toBeInTheDocument();
        expect(screen.getByText('Mobile')).toBeInTheDocument();
    });

    it('renders with data-slot="chart-legend-content" when payload is provided', () => {
        const payload = [
            {dataKey: 'desktop', value: 'Desktop', color: '#ff0000'},
        ];
        const {container} = render(
            <ChartContainer config={testConfig}>
                <svg>
                    <foreignObject>
                        <ChartLegendContent payload={payload} />
                    </foreignObject>
                </svg>
            </ChartContainer>
        );
        const el = container.querySelector('[data-slot="chart-legend-content"]');
        expect(el).toBeInTheDocument();
    });
});
