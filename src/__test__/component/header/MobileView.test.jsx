import { screen } from "@testing-library/react";
import { renderComponent } from "../../testHelper";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import Header from "../../../components/layout/header/Header";

test("show and hide nav items on click of hemberger icon", async () => {
  const { container } = renderComponent(<Header />, 300);

  const hembergerIcon = screen.queryByTestId("hemberger-icon");

  expect(hembergerIcon).toBeInTheDocument();
  await userEvent.click(hembergerIcon);

  const hembergerCloseBtn = screen.queryByTestId("hemberger-close");
  const navbar = container.querySelector(".mobile-view");

  expect(hembergerCloseBtn).toBeInTheDocument();
  expect(navbar).toBeInTheDocument();

  await userEvent.click(hembergerCloseBtn);
  const hiddenNavbar = container.querySelector(".mobile-view");

  expect(hembergerCloseBtn).not.toBeInTheDocument();
  expect(hiddenNavbar).not.toBeInTheDocument();
});

test("toggle search bar and nav items on click events", async () => {
  const { container } = renderComponent(<Header />, 300);

  const hembergerIcon = screen.queryByTestId("hemberger-icon");

  expect(hembergerIcon).toBeInTheDocument();
  await userEvent.click(hembergerIcon);

  const navber = container.querySelector(".mobile-view");
  const searchButton = screen.queryByTestId("mobile-search-icon");
  const hembergerCloseButton = screen.queryByTestId("hemberger-close");

  expect(navber).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
  expect(hembergerCloseButton).toBeInTheDocument();

  await userEvent.click(searchButton);

  const searchBar = screen.queryByRole("textbox", { name: /search_bar/i });
  const hiddenNavbar = container.querySelector(".mobile-view");
  const menuIcon = screen.queryByTestId("hemberger-icon");

  expect(searchBar).toBeInTheDocument();
  expect(hiddenNavbar).not.toBeInTheDocument();
  expect(menuIcon).toBeInTheDocument();
  expect(hembergerCloseButton).not.toBeInTheDocument();

  await userEvent.click(menuIcon);
  const hembergerCloseBtn = screen.queryByTestId("hemberger-close");

  expect(navber).toBeInTheDocument();
  expect(searchBar).not.toBeInTheDocument();
  expect(hembergerCloseBtn).toBeInTheDocument();

  await userEvent.click(hembergerCloseBtn);

  expect(navber).toBeInTheDocument();
});
