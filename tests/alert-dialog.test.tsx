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

import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

describe("AlertDialog", () => {
    it("renders trigger button", () => {
        render(
            <AlertDialog>
                <AlertDialogTrigger>Open</AlertDialogTrigger>
            </AlertDialog>
        );
        expect(screen.getByText("Open")).toBeInTheDocument();
    });

    it("opens dialog when trigger is clicked", async () => {
        const user = userEvent.setup();
        render(
            <AlertDialog>
                <AlertDialogTrigger>Open</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );

        await user.click(screen.getByText("Open"));
        expect(screen.getByText("Are you sure?")).toBeInTheDocument();
        expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();
    });

    it("closes dialog when cancel is clicked", async () => {
        const user = userEvent.setup();
        render(
            <AlertDialog defaultOpen>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );

        expect(screen.getByText("Are you sure?")).toBeInTheDocument();
        await user.click(screen.getByText("Cancel"));
        expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
    });

    it("closes dialog when action is clicked", async () => {
        const user = userEvent.setup();
        const handleAction = vi.fn();

        render(
            <AlertDialog defaultOpen>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );

        expect(screen.getByText("Are you sure?")).toBeInTheDocument();
        await user.click(screen.getByText("Continue"));
        expect(handleAction).toHaveBeenCalled();
        expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
    });

    it("applies custom className to components", () => {
        render(
            <AlertDialog defaultOpen>
                <AlertDialogContent className="custom-content">
                    <AlertDialogHeader className="custom-header">
                        <AlertDialogTitle className="custom-title">Title</AlertDialogTitle>
                        <AlertDialogDescription className="custom-description">
                            Description
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="custom-footer">
                        <AlertDialogCancel className="custom-cancel">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="custom-action">Action</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );

        const content = screen.getByRole("alertdialog");
        expect(content).toHaveClass("custom-content");

        const header = screen.getByText("Title").parentElement;
        expect(header).toHaveClass("custom-header");

        expect(screen.getByText("Title")).toHaveClass("custom-title");
        expect(screen.getByText("Description")).toHaveClass("custom-description");

        const footer = screen.getByText("Cancel").parentElement;
        expect(footer).toHaveClass("custom-footer");

        expect(screen.getByText("Cancel")).toHaveClass("custom-cancel");
        expect(screen.getByText("Action")).toHaveClass("custom-action");
    });

    it("handles controlled open state", async () => {
        const user = userEvent.setup();
        const Component = () => {
            const [open, setOpen] = React.useState(false);
            return (
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger>Open</AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogTitle>Dialog Title</AlertDialogTitle>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogContent>
                </AlertDialog>
            );
        };

        const React = await import("react");
        render(<Component/>);

        expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument();
        await user.click(screen.getByText("Open"));
        expect(screen.getByText("Dialog Title")).toBeInTheDocument();
        await user.click(screen.getByText("Close"));
        expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument();
    });
});