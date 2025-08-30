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
import userEvent from '@testing-library/user-event';
import {Tabs, TabsContent, TabsList, TabsTrigger,} from '@/components/ui/tabs';
import {describe, expect, it, vi} from 'vitest';

describe('Tabs Component', () => {
    it('should switch between tabs', async () => {
        const user = userEvent.setup();
        render(
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    Make changes to your account here.
                </TabsContent>
                <TabsContent value="password">
                    Change your password here.
                </TabsContent>
            </Tabs>
        );

        const accountTrigger = screen.getByRole('tab', {name: 'Account'});
        const passwordTrigger = screen.getByRole('tab', {name: 'Password'});

        // Check initial state
        expect(accountTrigger).toHaveAttribute('data-state', 'active');
        expect(passwordTrigger).toHaveAttribute('data-state', 'inactive');
        expect(screen.getByText('Make changes to your account here.')).toBeInTheDocument();

        // Click password tab
        await user.click(passwordTrigger);

        // Check password tab is now active
        expect(passwordTrigger).toHaveAttribute('data-state', 'active');
        expect(accountTrigger).toHaveAttribute('data-state', 'inactive');
        expect(screen.getByText('Change your password here.')).toBeInTheDocument();

        // Click back to account tab
        await user.click(accountTrigger);

        // Check account tab is active again
        expect(accountTrigger).toHaveAttribute('data-state', 'active');
        expect(passwordTrigger).toHaveAttribute('data-state', 'inactive');
        expect(screen.getByText('Make changes to your account here.')).toBeInTheDocument();
    });

    it('should call onValueChange when a tab is selected', async () => {
        const user = userEvent.setup();
        const onValueChange = vi.fn();
        render(
            <Tabs defaultValue="account" onValueChange={onValueChange}>
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
            </Tabs>
        );

        await user.click(screen.getByRole('tab', {name: 'Password'}));
        expect(onValueChange).toHaveBeenCalledWith('password');
    });

    it('should be navigable with a keyboard', async () => {
        const user = userEvent.setup();
        const {act} = await import('@testing-library/react');

        render(
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
            </Tabs>
        );

        const accountTrigger = screen.getByRole('tab', {name: 'Account'});
        const passwordTrigger = screen.getByRole('tab', {name: 'Password'});

        // Focus the first tab and navigate with keyboard
        await act(async () => {
            accountTrigger.focus();
        });

        await user.keyboard('{arrowright}');
        await vi.waitFor(() => {
            expect(passwordTrigger).toHaveFocus();
        });

        await user.keyboard('{arrowleft}');
        await vi.waitFor(() => {
            expect(accountTrigger).toHaveFocus();
        });
    });
});
