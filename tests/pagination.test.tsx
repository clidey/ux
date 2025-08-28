import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../src/components/ui/pagination';
import {describe, it, expect} from 'vitest';

describe('Pagination Component', () => {
    it('should render basic pagination', () => {
        render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#"/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#"/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
        expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
    });

    it('should show active page state', () => {
        render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            5
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );

        const activeLink = screen.getByText('5');
        expect(activeLink).toHaveAttribute('aria-current', 'page');
    });

    it('should render ellipsis for page ranges', () => {
        render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">10</PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        // Check for ellipsis icon/element
        const ellipsis = document.querySelector('[data-slot="pagination-ellipsis"]');
        expect(ellipsis).toBeInTheDocument();
    });

    it('should handle click events', async () => {
        const user = userEvent.setup();
        let clickedPage = '';

        render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink href="#" onClick={() => (clickedPage = '1')}>
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" onClick={() => (clickedPage = '2')}>
                            2
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );

        await user.click(screen.getByText('1'));
        expect(clickedPage).toBe('1');

        await user.click(screen.getByText('2'));
        expect(clickedPage).toBe('2');
    });

    it('should disable navigation when appropriate', () => {
        render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" aria-disabled="true"/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" aria-disabled="true"/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );

        const prevButton = screen.getByLabelText('Go to previous page');
        const nextButton = screen.getByLabelText('Go to next page');

        expect(prevButton).toHaveAttribute('aria-disabled', 'true');
        expect(nextButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('should accept custom className', () => {
        const {container} = render(
            <Pagination className="custom-pagination">
                <PaginationContent className="custom-content">
                    <PaginationItem className="custom-item">
                        <PaginationLink className="custom-link" href="#">
                            1
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );

        expect(container.querySelector('.custom-pagination')).toBeInTheDocument();
        expect(container.querySelector('.custom-content')).toBeInTheDocument();
        expect(container.querySelector('.custom-item')).toBeInTheDocument();
        expect(container.querySelector('.custom-link')).toBeInTheDocument();
    });

    it('should render with size variants', () => {
        render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink href="#" size="icon">
                            1
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );

        const link = screen.getByText('1');
        expect(link).toBeInTheDocument();
    });
});