import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import StatsStrip from "../components/StatsStrip";
import HawkerList from "../components/HawkerList";
import type { HawkerCentre } from "../types/hawker";

// ---- Mock data ----
const mockHawker: HawkerCentre = {
  id: 1,
  name: "Maxwell Food Centre",
  address: "1 Kadayanallur Street",
  postal_code: "069184",
  latitude: 1.2804,
  longitude: 103.8448,
  region: "Central",
  num_stalls: 100,
  created_at: "2024-01-01T00:00:00Z",
};

const mockHawker2: HawkerCentre = {
  id: 2,
  name: "Changi Village Hawker Centre",
  address: "2 Changi Village Road",
  postal_code: "500002",
  latitude: 1.3891,
  longitude: 103.9875,
  region: "East",
  num_stalls: 55,
  created_at: "2024-01-01T00:00:00Z",
};

// ---- SearchBar ----
describe("SearchBar", () => {
  it("renders with placeholder text", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(
      screen.getByPlaceholderText("Search hawker centres…")
    ).toBeInTheDocument();
  });

  it("calls onChange when user types", () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText("Search hawker centres…"), {
      target: { value: "Maxwell" },
    });
    expect(onChange).toHaveBeenCalledWith("Maxwell");
  });

  it("displays the current value", () => {
    render(<SearchBar value="tiong" onChange={() => {}} />);
    expect(screen.getByDisplayValue("tiong")).toBeInTheDocument();
  });
});

// ---- RegionFilter ----
describe("RegionFilter", () => {
  const regions = ["Central", "East", "West"];

  it("renders all region chips plus All", () => {
    render(
      <RegionFilter regions={regions} selected="" onSelect={() => {}} />
    );
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Central")).toBeInTheDocument();
    expect(screen.getByText("East")).toBeInTheDocument();
    expect(screen.getByText("West")).toBeInTheDocument();
  });

  it("highlights the selected region", () => {
    render(
      <RegionFilter regions={regions} selected="East" onSelect={() => {}} />
    );
    expect(screen.getByText("East")).toHaveClass("active");
    expect(screen.getByText("Central")).not.toHaveClass("active");
  });

  it("calls onSelect when a chip is clicked", () => {
    const onSelect = vi.fn();
    render(
      <RegionFilter regions={regions} selected="" onSelect={onSelect} />
    );
    fireEvent.click(screen.getByText("West"));
    expect(onSelect).toHaveBeenCalledWith("West");
  });

  it("deselects when clicking the active chip", () => {
    const onSelect = vi.fn();
    render(
      <RegionFilter regions={regions} selected="East" onSelect={onSelect} />
    );
    fireEvent.click(screen.getByText("East"));
    expect(onSelect).toHaveBeenCalledWith("");
  });
});

// ---- StatsStrip ----
describe("StatsStrip", () => {
  it("renders stats values", () => {
    render(
      <StatsStrip
        stats={{ total_centres: 80, total_stalls: 3500, by_region: {} }}
        filteredCount={42}
      />
    );
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
    expect(screen.getByText("3,500")).toBeInTheDocument();
  });

  it("shows dash when stats are null", () => {
    render(<StatsStrip stats={null} filteredCount={0} />);
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBe(2);
  });
});

// ---- HawkerList ----
describe("HawkerList", () => {
  it("renders hawker names", () => {
    render(
      <HawkerList
        hawkers={[mockHawker, mockHawker2]}
        selectedId={null}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText("Maxwell Food Centre")).toBeInTheDocument();
    expect(
      screen.getByText("Changi Village Hawker Centre")
    ).toBeInTheDocument();
  });

  it("shows empty state when no hawkers", () => {
    render(
      <HawkerList hawkers={[]} selectedId={null} onSelect={() => {}} />
    );
    expect(screen.getByText(/No hawker centres found/)).toBeInTheDocument();
  });

  it("highlights selected hawker", () => {
    const { container } = render(
      <HawkerList
        hawkers={[mockHawker]}
        selectedId={1}
        onSelect={() => {}}
      />
    );
    const item = container.querySelector(".hawker-item");
    expect(item).toHaveClass("selected");
  });

  it("calls onSelect when a hawker is clicked", () => {
    const onSelect = vi.fn();
    render(
      <HawkerList
        hawkers={[mockHawker]}
        selectedId={null}
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getByText("Maxwell Food Centre"));
    expect(onSelect).toHaveBeenCalledWith(mockHawker);
  });

  it("displays region and stall badges", () => {
    render(
      <HawkerList
        hawkers={[mockHawker]}
        selectedId={null}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText("Central")).toBeInTheDocument();
    expect(screen.getByText("100 stalls")).toBeInTheDocument();
  });
});
