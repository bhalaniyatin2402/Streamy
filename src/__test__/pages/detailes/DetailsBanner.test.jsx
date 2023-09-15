import { screen, within } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { renderComponent } from "../../testHelper";
import DetailsBanner from "../../../pages/details/detailsBanner/DetailsBanner";
import "../../testServer";
import userEvent from "@testing-library/user-event";

const video = {
  key: "i3F4zEOfYWA",
};

const crew = {
  director: ["Louis Leterrier"],
  writer: ["Justin Lin", "Dan Mazeau", "Zach Dean"],
};

test("fetching data ", async () => {
  const { container } = renderComponent(
    <DetailsBanner video={video} crew={crew} />
  );

  const title = await screen.findByText(/Fast X/i);
  const detailsBgContainer = container.querySelector(
    ".details-banner-background"
  );
  const posterContainer = container.querySelector(".left");
  const detailBg = await within(detailsBgContainer).findByRole("img");
  const poster = await within(posterContainer).findByRole("img");

  expect(detailBg).toHaveAttribute(
    "src",
    "https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg"
  );
  expect(poster).toHaveAttribute(
    "src",
    "https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg"
  );

  const elements = [
    await screen.findByText("Fast X (2023)"),
    await screen.findByText("The end of the road begins."),
    await screen.findByText(/action/i),
    await screen.findByText("7.3"),
    await screen.findByText(/Over many missions and against impossible/i),
    await screen.findByText("Released"),
    await screen.findByText("May 17, 2023"),
    await screen.findByText("2h 22m"),
    await screen.findByText(/Louis Leterrier/i),
    await screen.findByText(/Justin Lin/i),
  ];

  for (const element of elements) {
    expect(element).toBeInTheDocument();
  }

  const hiddenVideoPlayer = container.querySelector(".visible");
  const videoBtn = container.querySelector(".play-btn");

  expect(hiddenVideoPlayer).not.toBeInTheDocument();
  await userEvent.click(videoBtn);

  const videoPlayer = container.querySelector(".visible");
  expect(videoPlayer).toBeInTheDocument();
});
