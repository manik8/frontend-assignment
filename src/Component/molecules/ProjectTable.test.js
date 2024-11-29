import { render, screen } from "@testing-library/react";
import ProjectTable from "./ProjectTable";

const mockProjects = [
  { "percentage.funded": 50, "amt.pledged": 1000, currency: "USD" },
  { "percentage.funded": 60, "amt.pledged": 1500, currency: "USD" },
  { "percentage.funded": 70, "amt.pledged": 2000, currency: "USD" },
  { "percentage.funded": 80, "amt.pledged": 2500, currency: "USD" },
  { "percentage.funded": 90, "amt.pledged": 3000, currency: "USD" },
  { "percentage.funded": 95, "amt.pledged": 3500, currency: "USD" },
  { "percentage.funded": 85, "amt.pledged": 3200, currency: "USD" },
];

const setup = (projects = mockProjects, currentPage = 1) => {
  render(<ProjectTable projects={projects} currentPage={currentPage} />);
};

describe("ProjectTable Component", () => {
  test("renders the table with correct headers", () => {
    setup();
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged")).toBeInTheDocument();
  });

  test("renders paginated projects correctly for page 1", () => {
    setup(mockProjects, 1);

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(6);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("$1,000.00")).toBeInTheDocument();

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("90%")).toBeInTheDocument();
    expect(screen.getByText("$3,000.00")).toBeInTheDocument();
  });

  test("renders paginated projects correctly for page 2", () => {
    setup(mockProjects, 2);

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3);

    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("95%")).toBeInTheDocument();
    expect(screen.getByText("$3,500.00")).toBeInTheDocument();

    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText("$3,200.00")).toBeInTheDocument();
  });

  test("handles invalid currency gracefully", () => {
    const projectsWithInvalidCurrency = [
      { "percentage.funded": 50, "amt.pledged": 1000, currency: "INVALID" },
    ];
    setup(projectsWithInvalidCurrency, 1);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("1000 INVALID")).toBeInTheDocument();
  });
});
