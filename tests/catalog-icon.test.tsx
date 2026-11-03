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

import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { icons } from "@clidey/ux/icons";
import { CatalogIcon } from "@/components/ui/catalog-icon";
import { IconSearch, IconSearchAlt } from "@/components/ui/catalog-icons";

describe("catalog icon components", () => {
  it("renders the requested catalog artwork with currentColor", () => {
    const { container } = render(<IconSearch className="size-4" />);
    const svg = container.querySelector("svg")!;
    expect(svg.style.mask).toContain(icons.search);
    expect(svg.querySelector("rect")).toHaveAttribute("fill", "currentColor");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveClass("size-4");
  });

  it("preserves alternate artwork, SVG refs, and accessible labels", () => {
    const ref = createRef<SVGSVGElement>();
    render(<IconSearchAlt ref={ref} aria-label="Search" role="img" size={18} />);
    expect(screen.getByRole("img", { name: "Search" })).toBe(ref.current);
    expect(ref.current!.style.mask).toContain(icons["search-alt"]);
    expect(ref.current).toHaveAttribute("width", "18");
    expect(ref.current).not.toHaveAttribute("aria-hidden");
  });

  it("accepts a dynamic catalog name and caller SVG styles", () => {
    const { container } = render(<CatalogIcon name="source" style={{ color: "red" }} />);
    const svg = container.querySelector("svg")!;
    expect(svg.style.mask).toContain(icons.source);
    expect(svg).toHaveStyle({ color: "red" });
  });
});
