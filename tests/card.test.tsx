/*
 * Copyright 2025 Clidey, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {render, screen} from '@testing-library/react';
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from '@/components/ui/card';
import {describe, expect, it} from 'vitest';

describe('Card Component', () => {
    it('should render a card with all sections', () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description</CardDescription>
                </CardHeader>
                <CardContent>Card content goes here</CardContent>
                <CardFooter>Card footer</CardFooter>
            </Card>
        );

        expect(screen.getByText('Card Title')).toBeInTheDocument();
        expect(screen.getByText('Card description')).toBeInTheDocument();
        expect(screen.getByText('Card content goes here')).toBeInTheDocument();
        expect(screen.getByText('Card footer')).toBeInTheDocument();
    });

    it('should accept custom className', () => {
        const {container} = render(
            <Card className="custom-class">
                <CardContent>Content</CardContent>
            </Card>
        );

        const card = container.firstChild;
        expect(card).toHaveClass('custom-class');
    });

    it('should render without header or footer', () => {
        render(
            <Card>
                <CardContent>Just content</CardContent>
            </Card>
        );

        expect(screen.getByText('Just content')).toBeInTheDocument();
    });

    it('should render nested cards', () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Outer Card</CardTitle>
                </CardHeader>
                <CardContent>
                    <Card>
                        <CardHeader>
                            <CardTitle>Inner Card</CardTitle>
                        </CardHeader>
                        <CardContent>Inner content</CardContent>
                    </Card>
                </CardContent>
            </Card>
        );

        expect(screen.getByText('Outer Card')).toBeInTheDocument();
        expect(screen.getByText('Inner Card')).toBeInTheDocument();
        expect(screen.getByText('Inner content')).toBeInTheDocument();
    });

    it('should apply proper semantic structure', () => {
        const {container} = render(
            <Card>
                <CardHeader>
                    <CardTitle>Title</CardTitle>
                    <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>Content</CardContent>
            </Card>
        );

        const card = container.querySelector('[data-slot="card"]');
        expect(card).toBeInTheDocument();

        const title = container.querySelector('[data-slot="card-title"]');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Title');

        const description = container.querySelector('[data-slot="card-description"]');
        expect(description).toBeInTheDocument();
        expect(description).toHaveTextContent('Description');
    });

    it('should render card with action button', () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Card with Action</CardTitle>
                    <CardDescription>This card has an action</CardDescription>
                    <CardAction>
                        <button>Action</button>
                    </CardAction>
                </CardHeader>
                <CardContent>Content</CardContent>
            </Card>
        );

        expect(screen.getByText('Card with Action')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Action'})).toBeInTheDocument();
    });

    it('should position CardAction correctly', () => {
        const {container} = render(
            <Card>
                <CardHeader>
                    <CardTitle>Title</CardTitle>
                    <CardAction className="test-action">
                        <button>Menu</button>
                    </CardAction>
                </CardHeader>
            </Card>
        );

        const action = container.querySelector('[data-slot="card-action"]');
        expect(action).toBeInTheDocument();
        expect(action).toHaveClass('test-action');
    });
});