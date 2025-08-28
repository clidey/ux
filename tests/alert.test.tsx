import {render, screen} from '@testing-library/react';
import {Alert, AlertTitle, AlertDescription} from '../src/components/ui/alert';
import {describe, it, expect} from 'vitest';

describe('Alert Component', () => {
    it('should render an alert with a title and description', () => {
        render(
            <Alert>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    You can add components to your app using the cli.
                </AlertDescription>
            </Alert>
        );
        expect(screen.getByText('Heads up!')).toBeInTheDocument();
        expect(screen.getByText('You can add components to your app using the cli.')).toBeInTheDocument();
    });

    it('should apply the default variant', () => {
        const {container} = render(<Alert>Alert</Alert>);
        const alert = container.firstChild;
        expect(alert).not.toBeNull();
        expect(alert).toHaveAttribute('data-variant', 'default');
    });

    it('should apply the destructive variant', () => {
        const {container} = render(<Alert variant="destructive">Alert</Alert>);
        const alert = container.firstChild;
        expect(alert).not.toBeNull();
        expect(alert).toHaveAttribute('data-variant', 'destructive');
    });

    it('should render with no children', () => {
        render(<Alert/>);
        expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
    });

    it('should render with only a title', () => {
        render(
            <Alert>
                <AlertTitle>Heads up!</AlertTitle>
            </Alert>
        );
        expect(screen.getByText('Heads up!')).toBeInTheDocument();
        expect(screen.queryByText('You can add components to your app using the cli.')).not.toBeInTheDocument();
    });
});
