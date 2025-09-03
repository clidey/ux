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
import {Checkbox} from '@/components/ui/checkbox';
import {describe, expect, it, vi} from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Checkbox Component', () => {
    it('should render a checkbox element', () => {
        render(<Checkbox/>);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
    });

    it('should handle a change event', async () => {
        const handleChange = vi.fn();
        render(<Checkbox onCheckedChange={handleChange}/>);
        const checkbox = screen.getByRole('checkbox');
        await userEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should be disabled when the disabled prop is true', () => {
        render(<Checkbox disabled/>);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeDisabled();
    });

    it('should be checked when the checked prop is true', () => {
        render(<Checkbox checked/>);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    it('should be indeterminate when the checked prop is "indeterminate"', () => {
        render(<Checkbox checked="indeterminate"/>);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBePartiallyChecked();
    });
});
