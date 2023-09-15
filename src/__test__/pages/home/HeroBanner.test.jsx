import { screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import { renderComponent } from "../../testHelper";
import HeroBanner from "../../../pages/home/heroBanner/HeroBanner";
import userEvent from "@testing-library/user-event";
import "../../testServer";

describe("background image", () => {
  test("showing hero banner background", async () => {
    renderComponent(<HeroBanner />);

    const background = await screen.findByRole("img");

    expect(background).toBeInTheDocument();
    expect(background).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/original/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg"
    );
  });
});

describe("search bar", async () => {
  test("search bar is working?", async () => {
    renderComponent(<HeroBanner />);

    const serchBar = screen.getByPlaceholderText(
      /Search for movies or tv shows/i
    );
    const searchButton = screen.getByText("Search");

    expect(serchBar).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    await userEvent.click(serchBar);
    await userEvent.keyboard("harry potter");

    expect(serchBar).toHaveValue("harry potter");
  });
});
