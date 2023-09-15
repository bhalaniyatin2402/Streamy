import { getByText, screen, within } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import { renderComponent } from "../../testHelper";
import Trending from "../../../pages/home/trending/Trending";
import userEvent from "@testing-library/user-event";
import "../../testServer";

describe("trending by day", () => {
  test("trending fetch data for day base", async () => {
    const { container } = renderComponent(<Trending />);

    const allImages = await screen.findAllByRole("img");
    const movieCards = container.querySelectorAll(".movie-card");

    expect(movieCards).toHaveLength(2);

    const [movieCardOne, movieCardTwo] = movieCards;

    const posterOne = await within(movieCardOne).findByRole("img");
    const posterTwo = await within(movieCardTwo).findByRole("img");

    expect(posterOne).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
    );
    expect(posterTwo).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/original/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg"
    );

    const elements = [
      await within(movieCardOne).findByText(/Oppenheimer/i),
      await within(movieCardTwo).findByText(
        /Indiana Jones and the Dial of Destiny/i
      ),
      await within(movieCardOne).findByText(/Jul 19, 2023/i),
      await within(movieCardTwo).findByText(/Jun 28, 2023/i),
      await within(movieCardOne).findByText("8.3"),
      await within(movieCardTwo).findByText("6.7"),
      await within(movieCardOne).findByText(/drama/i),
      await within(movieCardTwo).findByText(/adventure/i),
    ];

    for (const element of elements) {
      expect(element).toBeInTheDocument();
    }
  });
});

describe("trending for week", () => {
  test("fetching trening movie list on click Week", async () => {
    const { container } = renderComponent(<Trending />);

    const weekButton = screen.getByText(/week/i);

    expect(weekButton).toBeInTheDocument();

    await userEvent.click(weekButton);
    const rendomElement = await screen.findByText("Meg 2: The Trench");

    const [movieCardOne, movieCardTwo] =
      container.querySelectorAll(".movie-card");

    const posterOne = await within(movieCardOne).findByRole("img");
    const posterTwo = await within(movieCardTwo).findByRole("img");

    expect(posterOne).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/original/FQHtuf2zc8suMFE28RyvFt3FJN.jpg"
    );
    expect(posterTwo).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/original/kdPMUMJzyYAc4roD52qavX0nLIC.jpg"
    );

    const elements = [
      await within(movieCardOne).findByText(/Meg 2: The Trench/i),
      await within(movieCardTwo).findByText(/Talk to Me/i),
      await within(movieCardOne).findByText("Aug 2, 2023"),
      await within(movieCardTwo).findByText("Jul 26, 2023"),
      await within(movieCardOne).findByText("7.0"),
      await within(movieCardTwo).findByText("7.2"),
      await within(movieCardOne).findByText(/action/i),
      await within(movieCardTwo).findByText(/horror/i),
    ];

    for (const element of elements) {
      expect(element).toBeInTheDocument();
    }
  });
});
