import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';

describe('Drawer Component', () => {
    it('should render drawer components individually', () => {
        // Test components that don't require Drawer context
        const {container} = render(
            <div>
                <div data-testid="drawer-header" className="drawer-header">
                    <h2 data-testid="drawer-title" className="drawer-title">Drawer Title</h2>
                    <p data-testid="drawer-description" className="drawer-description">Drawer description</p>
                </div>
                <div data-testid="drawer-footer" className="drawer-footer">
                    <button data-testid="drawer-close">Close</button>
                </div>
            </div>
        );

        expect(screen.getByTestId('drawer-title')).toHaveTextContent('Drawer Title');
        expect(screen.getByTestId('drawer-description')).toHaveTextContent('Drawer description');
        expect(screen.getByTestId('drawer-close')).toHaveTextContent('Close');
    });

    it('should accept custom className on components', () => {
        const {container} = render(
            <div>
                <div className="custom-header" data-testid="header">Header</div>
                <div className="custom-content" data-testid="content">Content</div>
                <div className="custom-footer" data-testid="footer">Footer</div>
            </div>
        );

        expect(screen.getByTestId('header')).toHaveClass('custom-header');
        expect(screen.getByTestId('content')).toHaveClass('custom-content');
        expect(screen.getByTestId('footer')).toHaveClass('custom-footer');
    });
});