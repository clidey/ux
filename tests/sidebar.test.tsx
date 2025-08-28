import {describe, it, expect, vi, beforeEach} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
} from "../src/components/ui/sidebar";

// Mock matchMedia
beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

describe("Sidebar", () => {
    it("renders sidebar with content", () => {
        render(
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Group Label</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>Menu Item</SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        expect(screen.getByText("Group Label")).toBeInTheDocument();
        expect(screen.getByText("Menu Item")).toBeInTheDocument();
    });

    it("renders sidebar header and footer", () => {
        render(
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader>Header Content</SidebarHeader>
                    <SidebarContent>Main Content</SidebarContent>
                    <SidebarFooter>Footer Content</SidebarFooter>
                </Sidebar>
            </SidebarProvider>
        );

        expect(screen.getByText("Header Content")).toBeInTheDocument();
        expect(screen.getByText("Main Content")).toBeInTheDocument();
        expect(screen.getByText("Footer Content")).toBeInTheDocument();
    });

    it("toggles sidebar with trigger", async () => {
        const user = userEvent.setup();

        const TestComponent = () => {
            const {state} = useSidebar();
            return (
                <>
                    <SidebarTrigger>Toggle</SidebarTrigger>
                    <div>State: {state}</div>
                </>
            );
        };

        render(
            <SidebarProvider defaultOpen={true}>
                <TestComponent/>
                <Sidebar>
                    <SidebarContent>Content</SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        expect(screen.getByText("State: expanded")).toBeInTheDocument();

        const triggerButton = screen.getByRole('button', {name: /toggle sidebar/i});
        await user.click(triggerButton);
        expect(screen.getByText("State: collapsed")).toBeInTheDocument();
    });

    it("renders menu with submenu", () => {
        render(
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>Parent Item</SidebarMenuButton>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton>Sub Item 1</SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton>Sub Item 2</SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        expect(screen.getByText("Parent Item")).toBeInTheDocument();
        expect(screen.getByText("Sub Item 1")).toBeInTheDocument();
        expect(screen.getByText("Sub Item 2")).toBeInTheDocument();
    });

    it("renders menu with badge", () => {
        render(
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    Notifications
                                    <SidebarMenuBadge>5</SidebarMenuBadge>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        expect(screen.getByText("Notifications")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("renders menu action button", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>Item</SidebarMenuButton>
                                <SidebarMenuAction onClick={handleClick}>
                                    Action
                                </SidebarMenuAction>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        await user.click(screen.getByText("Action"));
        expect(handleClick).toHaveBeenCalled();
    });

    it("renders group action", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                Label
                                <SidebarGroupAction onClick={handleClick}>
                                    Action
                                </SidebarGroupAction>
                            </SidebarGroupLabel>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        await user.click(screen.getByText("Action"));
        expect(handleClick).toHaveBeenCalled();
    });

    it("renders sidebar input", () => {
        render(
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarInput placeholder="Search..."/>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        const input = screen.getByPlaceholderText("Search...");
        expect(input).toBeInTheDocument();
    });

    it("renders separator", () => {
        render(
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <div>Section 1</div>
                        <SidebarSeparator/>
                        <div>Section 2</div>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        expect(screen.getByText("Section 1")).toBeInTheDocument();
        expect(screen.getByText("Section 2")).toBeInTheDocument();

        const separator = document.querySelector('[data-sidebar="separator"]');
        expect(separator).toBeInTheDocument();
    });

    it("renders skeleton loading state", () => {
        render(
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuSkeleton/>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        const skeleton = document.querySelector('[data-sidebar="menu-skeleton"]');
        expect(skeleton).toBeInTheDocument();
    });

    it("renders sidebar with rail", () => {
        render(
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>Content</SidebarContent>
                    <SidebarRail/>
                </Sidebar>
            </SidebarProvider>
        );

        const rail = document.querySelector('[data-sidebar="rail"]');
        expect(rail).toBeInTheDocument();
    });

    it("renders sidebar inset", () => {
        render(
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>Sidebar Content</SidebarContent>
                </Sidebar>
                <SidebarInset>
                    <div>Main Content Area</div>
                </SidebarInset>
            </SidebarProvider>
        );

        expect(screen.getByText("Main Content Area")).toBeInTheDocument();
        const inset = screen.getByText("Main Content Area").parentElement;
        expect(inset).toHaveAttribute("data-sidebar", "inset");
    });

    it("applies custom classNames", () => {
        render(
            <SidebarProvider>
                <Sidebar className="custom-sidebar">
                    <SidebarHeader className="custom-header">Header</SidebarHeader>
                    <SidebarContent className="custom-content">
                        <SidebarGroup className="custom-group">
                            <SidebarGroupLabel className="custom-label">
                                Label
                            </SidebarGroupLabel>
                            <SidebarMenu className="custom-menu">
                                <SidebarMenuItem className="custom-item">
                                    <SidebarMenuButton className="custom-button">
                                        Button
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="custom-footer">Footer</SidebarFooter>
                </Sidebar>
            </SidebarProvider>
        );

        const sidebar = document.querySelector('[data-sidebar="sidebar"]');
        expect(sidebar).toHaveClass("custom-sidebar");

        expect(document.querySelector('[data-slot="sidebar-header"]')).toHaveClass("custom-header");
        expect(document.querySelector('[data-slot="sidebar-group"]')).toHaveClass("custom-group");
        expect(screen.getByText("Button")).toHaveClass("custom-button");
        expect(document.querySelector('[data-slot="sidebar-footer"]')).toHaveClass("custom-footer");
    });

    it("handles different sidebar variants", () => {
        const {rerender} = render(
            <SidebarProvider>
                <Sidebar variant="sidebar">
                    <SidebarContent>Content</SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        let sidebar = document.querySelector('[data-sidebar="sidebar"]');
        expect(sidebar).toHaveAttribute("data-variant", "sidebar");

        rerender(
            <SidebarProvider>
                <Sidebar variant="floating">
                    <SidebarContent>Content</SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        sidebar = document.querySelector('[data-sidebar="sidebar"]');
        expect(sidebar).toHaveAttribute("data-variant", "floating");

        rerender(
            <SidebarProvider>
                <Sidebar variant="inset">
                    <SidebarContent>Content</SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        sidebar = document.querySelector('[data-sidebar="sidebar"]');
        expect(sidebar).toHaveAttribute("data-variant", "inset");
    });

    it("handles collapsible groups", () => {
        render(
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup collapsible>
                            <SidebarGroupLabel>Collapsible Group</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <div>Group Content</div>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        );

        const group = screen.getByText("Collapsible Group").closest('[data-sidebar="group"]');
        expect(group).toHaveAttribute("data-collapsible", "true");
    });
});