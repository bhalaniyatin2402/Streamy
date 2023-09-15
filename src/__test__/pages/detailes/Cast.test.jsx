import { screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { renderComponent } from "../../testHelper";
import Cast from "../../../pages/details/cast/Cast";
import "../../testServer";

const data = [
  {
    profile_path: "/nZdVry7lnUkE24PnXakok9okvL4.jpg",
    name: "Vin Diesel",
    character: "Dominic Toretto",
    cast_id: 0,
  },
  {
    profile_path: "/6EZaBiQHx3Xlz3j0D6ttDxHXaxr.jpg",
    name: "John Cena",
    character: "Jakob Toretto",
    cast_id: 70,
  },
];

test("showing list of cast", async () => {
  const { container } = renderComponent(<Cast data={data} />);

  const randomElement = await screen.findAllByRole("img");
  const castList = container.querySelectorAll(".list-item");

  expect(castList).toHaveLength(2);

  const [castImgOne, castimgTwo] = await screen.findAllByRole("img");

  expect(castImgOne).toHaveAttribute(
    "src",
    "https://image.tmdb.org/t/p/original/nZdVry7lnUkE24PnXakok9okvL4.jpg"
  );
  expect(castimgTwo).toHaveAttribute(
    "src",
    "https://image.tmdb.org/t/p/original/6EZaBiQHx3Xlz3j0D6ttDxHXaxr.jpg"
  );

  const elements = [
    await screen.findByText("Vin Diesel"),
    await screen.findByText("Dominic Toretto"),
    await screen.findByText("John Cena"),
    await screen.findByText("Jakob Toretto"),
  ];

  for (const element of elements) {
    expect(element).toBeInTheDocument();
  }
});
