import { findByText, fireEvent, screen, within } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import { renderComponent } from "../testHelper";
import SearchResult from "../../pages/searchResult/SearchResult";
import "../testServer";

describe("fetch initial data", () => {
  test("show initial data when render the component", async () => {
    const { container } = renderComponent(<SearchResult />);

    const rendomElement = await screen.findAllByRole("img");
    const totalResults = container.querySelectorAll(".movie-card");
    const [resultOne, resultTwo] = totalResults;

    expect(totalResults).toHaveLength(2);

    const imageOne = await within(resultOne).findByRole("img");
    const imageTwo = await within(resultTwo).findByRole("img");

    expect(imageOne).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/original/FQHtuf2zc8suMFE28RyvFt3FJN.jpg"
    );
    expect(imageTwo).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/original/kdPMUMJzyYAc4roD52qavX0nLIC.jpg"
    );

    const elements = [
      await screen.findByText("Meg 2: The Trench"),
      await screen.findByText("Aug 2, 2023"),
      await screen.findByText("Talk to Me"),
      await screen.findByText("Jul 26, 2023"),
    ];

    for (const element of elements) {
      expect(element).toBeInTheDocument();
    }
  });
});

describe("test infinite scroll", () => {
  test("fetching next set of data on scroll", async () => {
    const { container } = renderComponent(<SearchResult />);

    const rendomElement = await screen.findAllByRole("img");
    expect(rendomElement).toHaveLength(2);

    await fireEvent.scroll(window, { target: { screenY } });

    const randomEle = await screen.findByText("Oppenheimer");
    const totalResults = await container.querySelectorAll(".movie-card");
    expect(totalResults).toHaveLength(4);

    const resultThree = totalResults[2];
    const resultFour = totalResults[3];
    const imageThree = await within(resultThree).findByRole("img");
    const imageFour = await within(resultFour).findByRole("img");

    expect(imageThree).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
    );
    expect(imageFour).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/original/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg"
    );

    const elements = [
      await screen.findByText("Oppenheimer"),
      await screen.findByText("Jul 19, 2023"),
      await screen.findByText("Indiana Jones and the Dial of Destiny"),
      await screen.findByText("Jun 28, 2023"),
    ];

    for (const element of elements) {
      expect(element).toBeInTheDocument();
    }
  });
});
