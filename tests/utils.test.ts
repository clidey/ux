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

import {describe, expect, it} from 'vitest';
import {formatDate, toTitleCase} from '@/lib/utils';

describe('Utility Functions', () => {
    describe('toTitleCase', () => {
        it('should convert a lowercase string to title case', () => {
            expect(toTitleCase('hello world')).toBe('Hello World');
        });

        it('should handle strings with underscores', () => {
            expect(toTitleCase('hello_world')).toBe('Hello World');
        });

        it('should handle already title-cased strings', () => {
            expect(toTitleCase('Hello World')).toBe('Hello World');
        });

        it('should handle single-word strings', () => {
            expect(toTitleCase('hello')).toBe('Hello');
        });

        it('should handle an empty string', () => {
            expect(toTitleCase('')).toBe('');
        });

        it('should handle a string with leading/trailing spaces', () => {
            expect(toTitleCase('  hello world  ')).toBe('  Hello World  ');
        });

        it('should handle strings with mixed case', () => {
            expect(toTitleCase('hELLo wORLd')).toBe('Hello World');
        });
    });

    describe('formatDate', () => {
        it('should return "just now" for a date less than a minute ago', () => {
            const date = new Date(Date.now() - 30 * 1000);
            expect(formatDate(date)).toBe('just now');
        });

        it('should return "1 minute ago"', () => {
            const date = new Date(Date.now() - 60 * 1000);
            expect(formatDate(date)).toBe('1 minute ago');
        });

        it('should return "2 minutes ago"', () => {
            const date = new Date(Date.now() - 2 * 60 * 1000);
            expect(formatDate(date)).toBe('2 minutes ago');
        });

        it('should return "1 hour ago"', () => {
            const date = new Date(Date.now() - 60 * 60 * 1000);
            expect(formatDate(date)).toBe('1 hour ago');
        });

        it('should return "2 hours ago"', () => {
            const date = new Date(Date.now() - 2 * 60 * 60 * 1000);
            expect(formatDate(date)).toBe('2 hours ago');
        });

        it('should return "1 day ago"', () => {
            const date = new Date(Date.now() - 24 * 60 * 60 * 1000);
            expect(formatDate(date)).toBe('1 day ago');
        });

        it('should return "2 days ago"', () => {
            const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
            expect(formatDate(date)).toBe('2 days ago');
        });

        it('should return "1 month ago"', () => {
            const date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            expect(formatDate(date)).toBe('1 month ago');
        });

        it('should return "2 months ago"', () => {
            const date = new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000);
            expect(formatDate(date)).toBe('2 months ago');
        });

        it('should return "1 year ago"', () => {
            const date = new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000);
            expect(formatDate(date)).toBe('1 year ago');
        });

        it('should return "2 years ago"', () => {
            const date = new Date(Date.now() - 2 * 12 * 30 * 24 * 60 * 60 * 1000);
            expect(formatDate(date)).toBe('2 years ago');
        });

        it('should handle a future date', () => {
            const date = new Date(Date.now() + 100000);
            expect(formatDate(date)).toBe('just now');
        });
    });
});
