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

import {beforeEach, describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {MasterDetailPanels} from "@/components/ui/master-detail-panels";

const isMobile = vi.hoisted(() => ({value: false}));

vi.mock("@/hooks/use-mobile", () => ({
    useIsMobile: () => isMobile.value,
}));

function renderPanels(props: Partial<React.ComponentProps<typeof MasterDetailPanels>> = {}) {
    return render(
        <MasterDetailPanels
            list={<div>List content</div>}
            detail={<div>Detail content</div>}
            detailOpen={false}
            onBack={() => {}}
            backLabel="Back"
            {...props}
        />
    );
}

describe("MasterDetailPanels", () => {
    beforeEach(() => {
        isMobile.value = false;
    });

    it("renders both panels in a horizontal resizable split on desktop", () => {
        renderPanels();

        expect(screen.getByText("List content")).toBeInTheDocument();
        expect(screen.getByText("Detail content")).toBeInTheDocument();
        expect(document.querySelector("[data-group]")).toHaveAttribute("data-orientation", "horizontal");
        expect(screen.queryByRole("button", {name: "Back"})).not.toBeInTheDocument();
    });

    it("shows only the list on mobile when no detail is open", () => {
        isMobile.value = true;
        renderPanels({detailOpen: false});

        expect(screen.getByText("List content")).toBeInTheDocument();
        expect(screen.queryByText("Detail content")).not.toBeInTheDocument();
        expect(document.querySelector("[data-group]")).not.toBeInTheDocument();
    });

    it("shows the detail with a back button on mobile when detail is open", () => {
        isMobile.value = true;
        const onBack = vi.fn();
        renderPanels({detailOpen: true, onBack, backLabel: "All items"});

        expect(screen.queryByText("List content")).not.toBeInTheDocument();
        expect(screen.getByText("Detail content")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", {name: "All items"}));
        expect(onBack).toHaveBeenCalledTimes(1);
    });

    it("applies className to the container in both modes", () => {
        const {unmount} = renderPanels({className: "custom-split"});
        expect(document.querySelector("[data-group]")).toHaveClass("custom-split");
        unmount();

        isMobile.value = true;
        renderPanels({className: "custom-split"});
        expect(document.querySelector('[data-slot="master-detail-list"]')).toHaveClass("custom-split");
    });
});
