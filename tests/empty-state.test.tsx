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
import {EmptyState} from '@/components/ui/empty-state';
import {describe, expect, it} from 'vitest';

describe('EmptyState Component', () => {
    it('should render empty state with title and description', () => {
        render(
            <EmptyState
                title="No results found"
                description="Try adjusting your search or filters"
            />
        );

        expect(screen.getByText('No results found')).toBeInTheDocument();
        expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
    });

    it('should render with icon', () => {
        const Icon = () => <svg data-testid="custom-icon"/>;

        render(
            <EmptyState
                title="Empty"
                icon={<Icon/>}
            />
        );

        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should render with action button', () => {
        render(
            <EmptyState
                title="No items"
                description=""
                icon={null}
            >
                <button>Add Item</button>
            </EmptyState>
        );

        expect(screen.getByRole('button', {name: 'Add Item'})).toBeInTheDocument();
    });

    it('should accept custom className', () => {
        const {container} = render(
            <EmptyState
                title="Empty"
                className="custom-empty"
            />
        );

        expect(container.querySelector('.custom-empty')).toBeInTheDocument();
    });

    it('should render without description', () => {
        render(
            <EmptyState title="Just a title"/>
        );

        expect(screen.getByText('Just a title')).toBeInTheDocument();
    });

    it('should render with all props', () => {
        const Icon = () => <span>📭</span>;

        render(
            <EmptyState
                title="Your inbox is empty"
                description="When you receive messages, they'll appear here"
                icon={<Icon/>}
                className="inbox-empty"
            >
                <button>Compose Message</button>
            </EmptyState>
        );

        expect(screen.getByText('Your inbox is empty')).toBeInTheDocument();
        expect(screen.getByText("When you receive messages, they'll appear here")).toBeInTheDocument();
        expect(screen.getByText('📭')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Compose Message'})).toBeInTheDocument();
    });
});