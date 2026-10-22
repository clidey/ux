import {render, screen} from '@testing-library/react';
import {ChartContainer, ChartStyle, ChartLegendContent, ChartTooltipContent} from '@/components/ui/chart';
import type {ChartConfig} from '@/components/ui/chart';
import {beforeAll, describe, expect, it, vi} from 'vitest';
import * as React from 'react';

beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {configurable: true, value: 400});
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {configurable: true, value: 300});
    vi.stubGlobal('ResizeObserver', class {
        callback: ResizeObserverCallback;
        constructor(cb: ResizeObserverCallback) { this.callback = cb; }
        observe(target: Element) {
            this.callback([{target, contentRect: {width: 400, height: 300}} as unknown as ResizeObserverEntry], this as unknown as ResizeObserver);
        }
        unobserve() {}
        disconnect() {}
    });
});

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

describe('ChartStyle input validation', () => {
    const payload = '</style><img src=x onerror="alert(1)"><style>';

    it('drops colors containing stylesheet delimiters', () => {
        const config: ChartConfig = {
            safe: {label: 'Safe', color: '#ff0000'},
            evil: {label: 'Evil', color: `red} ${payload}`},
            breakout: {label: 'Breakout', color: 'red; } * { position: fixed'},
        };
        const {container} = render(<ChartStyle id="test-chart" config={config} />);
        const style = container.querySelector('style');
        expect(style).toBeInTheDocument();
        expect(style?.children.length).toBe(0);
        expect(style?.textContent).toContain('--color-safe: #ff0000');
        expect(style?.textContent).not.toContain('--color-evil');
        expect(style?.textContent).not.toContain('--color-breakout');
        expect(style?.textContent).not.toContain('</style>');
        expect(container.querySelector('img')).not.toBeInTheDocument();
    });

    it('drops config keys that are not plain identifiers', () => {
        const config: ChartConfig = {
            safe: {label: 'Safe', color: '#ff0000'},
            [payload]: {label: 'Evil', color: '#00ff00'},
            'a;b': {label: 'Semi', color: '#0000ff'},
        };
        const {container} = render(<ChartStyle id="test-chart" config={config} />);
        const style = container.querySelector('style');
        expect(style?.textContent).toContain('--color-safe: #ff0000');
        expect(style?.textContent).not.toContain('#00ff00');
        expect(style?.textContent).not.toContain('#0000ff');
        expect(style?.textContent).not.toContain('<');
    });

    it('accepts the common CSS color syntaxes', () => {
        const config: ChartConfig = {
            hex: {color: '#abc'},
            rgb: {color: 'rgb(1 2 3 / 50%)'},
            hsl: {color: 'hsl(var(--chart-1))'},
            oklch: {color: 'oklch(0.7 0.1 200)'},
            keyword: {color: 'rebeccapurple'},
            variable: {color: 'var(--chart-2)'},
        };
        const {container} = render(<ChartStyle id="test-chart" config={config} />);
        const text = container.querySelector('style')?.textContent ?? '';
        for (const key of Object.keys(config)) {
            expect(text).toContain(`--color-${key}: ${config[key].color};`);
        }
    });

    it('renders nothing for an id that could escape the selector', () => {
        const {container} = render(<ChartStyle id="x] * { color: red } [data-chart=y" config={testConfig} />);
        expect(container.querySelector('style')).not.toBeInTheDocument();
    });

    it('sanitizes a consumer-supplied id on ChartContainer', () => {
        const {container} = render(
            <ChartContainer id="my chart]{" config={testConfig}>
                <svg><rect /></svg>
            </ChartContainer>
        );
        const chart = container.querySelector('[data-chart]');
        expect(chart?.getAttribute('data-chart')).toBe('chart-mychart');
        expect(container.querySelector('style')?.textContent).toContain('[data-chart=chart-mychart]');
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
            <div style={{width: 400, height: 300}}>
                <ChartContainer config={testConfig}>
                    <svg>
                        <foreignObject>
                            <ChartTooltipContent active={true} payload={payload} />
                        </foreignObject>
                    </svg>
                </ChartContainer>
            </div>
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
            <div style={{width: 400, height: 300}}>
                <ChartContainer config={testConfig}>
                    <svg>
                        <foreignObject>
                            <ChartLegendContent payload={payload} />
                        </foreignObject>
                    </svg>
                </ChartContainer>
            </div>
        );
        expect(screen.getByText('Desktop')).toBeInTheDocument();
        expect(screen.getByText('Mobile')).toBeInTheDocument();
    });

    it('renders with data-slot="chart-legend-content" when payload is provided', () => {
        const payload = [
            {dataKey: 'desktop', value: 'Desktop', color: '#ff0000'},
        ];
        const {container} = render(
            <div style={{width: 400, height: 300}}>
                <ChartContainer config={testConfig}>
                    <svg>
                        <foreignObject>
                            <ChartLegendContent payload={payload} />
                        </foreignObject>
                    </svg>
                </ChartContainer>
            </div>
        );
        const el = container.querySelector('[data-slot="chart-legend-content"]');
        expect(el).toBeInTheDocument();
    });
});
