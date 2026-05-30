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
import {Input, SearchInput, TextArea} from '@/components/ui/input';
import {describe, expect, it, vi} from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Input Component', () => {
    it('should render an input element', () => {
        render(<Input/>);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });

    it('should handle a change event', async () => {
        const handleChange = vi.fn();
        render(<Input onChange={handleChange}/>);
        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'test');
        expect(handleChange).toHaveBeenCalledTimes(4);
    });

    it('should be disabled when the disabled prop is true', () => {
        render(<Input disabled/>);
        const input = screen.getByRole('textbox');
        expect(input).toBeDisabled();
    });

    it('should accept a default value', () => {
        render(<Input defaultValue="test"/>);
        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('test');
    });

    it('should have the correct type', () => {
        const {rerender} = render(<Input type="password"/>);
        let input = screen.getByTestId('input');
        expect(input).toHaveAttribute('type', 'password');

        rerender(<Input type="number"/>);
        input = screen.getByRole('spinbutton');
        expect(input).toHaveAttribute('type', 'number');
    });

    it('should have a placeholder', () => {
        render(<Input placeholder="test"/>);
        const input = screen.getByPlaceholderText('test');
        expect(input).toBeInTheDocument();
    });
});

describe('TextArea Component', () => {
    it('should render a textarea element', () => {
        render(<TextArea/>);
        const textarea = screen.getByRole('textbox');
        expect(textarea).toBeInTheDocument();
    });
});

describe('Input with showPasswordToggle', () => {
    it('should render password input with toggle button', () => {
        render(<Input type="password" showPasswordToggle placeholder="Enter password" />);

        const input = screen.getByTestId('password-input');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'password');

        const toggleButton = screen.getByTestId('password-toggle');
        expect(toggleButton).toBeInTheDocument();
    });

    it('should toggle password visibility when button is clicked', async () => {
        render(<Input type="password" showPasswordToggle />);

        const input = screen.getByTestId('password-input');
        const toggleButton = screen.getByTestId('password-toggle');

        // Initially password is hidden
        expect(input).toHaveAttribute('type', 'password');
        expect(toggleButton).toHaveAttribute('aria-label', 'Show password');

        // Click to show password
        await userEvent.click(toggleButton);
        expect(input).toHaveAttribute('type', 'text');
        expect(toggleButton).toHaveAttribute('aria-label', 'Hide password');

        // Click to hide password again
        await userEvent.click(toggleButton);
        expect(input).toHaveAttribute('type', 'password');
        expect(toggleButton).toHaveAttribute('aria-label', 'Show password');
    });

    it('should render wrapper with data-slot attribute', () => {
        const {container} = render(<Input type="password" showPasswordToggle />);
        const wrapper = container.querySelector('[data-slot="password-input-wrapper"]');
        expect(wrapper).toBeInTheDocument();
    });

    it('should render normal password input without toggle when showPasswordToggle is false', () => {
        render(<Input type="password" />);
        const input = screen.getByTestId('input');
        expect(input).toHaveAttribute('type', 'password');
        expect(screen.queryByTestId('password-toggle')).not.toBeInTheDocument();
    });

    it('should accept custom className on password wrapper', () => {
        const {container} = render(<Input type="password" showPasswordToggle className="custom-pw" />);
        const wrapper = container.querySelector('[data-slot="password-input-wrapper"]');
        expect(wrapper).toHaveClass('custom-pw');
    });

    it('should handle disabled state on password input with toggle', () => {
        render(<Input type="password" showPasswordToggle disabled />);
        const input = screen.getByTestId('password-input');
        expect(input).toBeDisabled();
    });
});

describe('SearchInput Component', () => {
    it('should render a search input element', () => {
        render(<SearchInput/>);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });
});
