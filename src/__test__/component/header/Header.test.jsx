import { screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderComponent } from "../../testHelper";
import Header from "../../../components/layout/header/Header";

test("should render the header component", () => {
  renderComponent(<Header />);
});

test("show logo in the header", () => {
  renderComponent(<Header />);

  const logoIcon = screen.getByAltText("logo-icon");
  const logoName = screen.getByAltText("logo-name");

  expect(logoIcon).toBeInTheDocument();
  expect(logoName).toBeInTheDocument();
});

test("search bar show and hide on icon click", async () => {
  const { container } = renderComponent(<Header />);

  const searchButton = container.querySelector(".search-icon");
  const hiddenSearchBar = screen.queryByRole("textbox", {
    name: /search_bar/i,
  });
  const hiddenSearchCloseBtn = screen.queryByTestId("search_close");

  expect(searchButton).toBeInTheDocument();
  expect(hiddenSearchBar).not.toBeInTheDocument();
  expect(hiddenSearchCloseBtn).not.toBeInTheDocument();

  await userEvent.click(searchButton);
  const searchBar = screen.queryByRole("textbox", { name: /search_bar/i });
  const searchCloseBtn = screen.queryByTestId("search_close");

  expect(searchBar).toBeInTheDocument();
  expect(searchCloseBtn).toBeInTheDocument();

  await userEvent.click(searchCloseBtn);

  expect(searchBar).not.toBeInTheDocument();
  expect(searchCloseBtn).not.toBeInTheDocument();
});

test("search event done on enter", async () => {
  const { container } = renderComponent(<Header />);

  const searchButton = container.querySelector(".search-icon");

  await userEvent.click(searchButton);

  const searchBar = screen.queryByRole("textbox", { name: /search_bar/i });
  expect(searchBar).toBeInTheDocument();

  await userEvent.click(searchBar);
  await userEvent.keyboard("thor");

  expect(searchBar).toHaveValue("thor");

  await userEvent.keyboard("Enter");

  setTimeout(() => {
    const hiddenSearchBar = screen.queryByRole("textbox", {
      name: /search_bar/i,
    });
    expect(hiddenSearchBar).not.toBeInTheDocument();
  }, 600);
});
