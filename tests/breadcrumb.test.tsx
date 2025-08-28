import {render, screen} from '@testing-library/react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../src/components/ui/breadcrumb';
import {describe, it, expect} from 'vitest';

describe('Breadcrumb Component', () => {
    it('should render a basic breadcrumb', () => {
        render(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Current Page</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();
        expect(screen.getByText('Current Page')).toBeInTheDocument();
    });

    it('should render breadcrumb links', () => {
        render(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

        const link = screen.getByRole('link', {name: 'Dashboard'});
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/dashboard');
    });

    it('should accept custom className', () => {
        const {container} = render(
            <Breadcrumb className="custom-breadcrumb">
                <BreadcrumbList className="custom-list">
                    <BreadcrumbItem className="custom-item">
                        <BreadcrumbLink className="custom-link" href="/">
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

        expect(container.querySelector('.custom-breadcrumb')).toBeInTheDocument();
        expect(container.querySelector('.custom-list')).toBeInTheDocument();
        expect(container.querySelector('.custom-item')).toBeInTheDocument();
        expect(container.querySelector('.custom-link')).toBeInTheDocument();
    });

    it('should render current page without link', () => {
        render(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Current Page</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

        const page = screen.getByText('Current Page');
        expect(page).toBeInTheDocument();
        expect(page.tagName).not.toBe('A');
    });

    it('should render custom separator', () => {
        render(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>→</BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/about">About</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

        expect(screen.getByText('→')).toBeInTheDocument();
    });

    it('should handle asChild prop for custom link components', () => {
        const CustomLink = ({children, ...props}: any) => (
            <a {...props} data-custom="true">
                {children}
            </a>
        );

        render(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <CustomLink href="/custom">Custom Link</CustomLink>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

        const link = screen.getByText('Custom Link');
        expect(link).toHaveAttribute('data-custom', 'true');
    });
});