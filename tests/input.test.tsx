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

describe('SearchInput Component', () => {
    it('should render a search input element', () => {
        render(<SearchInput/>);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });
});
