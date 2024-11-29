import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const onPageChangeMock = jest.fn();

  const setup = (currentPage, totalPages) => {
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChangeMock}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders pagination buttons", () => {
    setup(1, 10);
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("highlights the active page", () => {
    setup(3, 10);
    const activeButton = screen.getByText("3");
    expect(activeButton).toHaveClass("active");
  });

  test("disables previous button on the first page", () => {
    setup(1, 10);
    const prevButton = screen.getByText("<");
    expect(prevButton).toBeDisabled();
  });

  test("disables next button on the last page", () => {
    setup(10, 10);
    const nextButton = screen.getByText(">");
    expect(nextButton).toBeDisabled();
  });

  test("calls onPageChange with the correct page number when a button is clicked", () => {
    setup(3, 10);

    const pageButton = screen.getByText("4");
    fireEvent.click(pageButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  test("previous button calls onPageChange with the correct page number", () => {
    setup(3, 10);

    const prevButton = screen.getByText("<");
    fireEvent.click(prevButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  test("next button calls onPageChange with the correct page number", () => {
    setup(3, 10);

    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  test("renders only 5 page buttons at a time", () => {
    setup(5, 20);
    const visiblePages = screen.getAllByRole("button", { name: /^[0-9]+$/ });
    expect(visiblePages.length).toBe(5);

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  test("renders correct pages when current page is near the start", () => {
    setup(2, 20);
    const visiblePages = screen.getAllByRole("button", { name: /^[0-9]+$/ });
    expect(visiblePages.map((btn) => btn.textContent)).toEqual(["1", "2", "3", "4", "5"]);
  });

  test("pagination buttons are accessible via ARIA roles", () => {
    setup(1, 10);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });  
});
