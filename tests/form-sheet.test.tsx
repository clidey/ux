import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormSheet } from '@/components/ui/form-sheet';

describe('FormSheet', () => {
    it('should render title when open', () => {
        render(<FormSheet open onClose={() => {}} title="Edit profile">Content</FormSheet>);
        expect(screen.getByText('Edit profile')).toBeInTheDocument();
    });

    it('should render description when provided', () => {
        render(<FormSheet open onClose={() => {}} title="Edit" description="Update your info">Content</FormSheet>);
        expect(screen.getByText('Update your info')).toBeInTheDocument();
    });

    it('should render children', () => {
        render(<FormSheet open onClose={() => {}} title="T"><p>Form content</p></FormSheet>);
        expect(screen.getByText('Form content')).toBeInTheDocument();
    });

    it('should not render when closed', () => {
        render(<FormSheet open={false} onClose={() => {}} title="Hidden">Content</FormSheet>);
        expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });

    it('should render footer when provided', () => {
        render(
            <FormSheet open onClose={() => {}} title="T" footer={<button>Save</button>}>
                Content
            </FormSheet>
        );
        expect(screen.getByText('Save')).toBeInTheDocument();
    });
});
