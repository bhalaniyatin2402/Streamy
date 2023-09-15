import { screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { renderComponent } from "../../testHelper";
import Videos from "../../../pages/details/videos/Videos";
import "../../testServer";
import userEvent from "@testing-library/user-event";

const data = [
  { key: "i3F4zEOfYWA", name: "EVEN MORE Gags," },
  { key: "OKsfbx2_8D4", name: "How Fast X Intertwines With All" },
];

test("shwoing list of video", async () => {
  const { container } = renderComponent(<Videos data={data} />);

  const rendomElement = await screen.findAllByRole("img");
  const videoList = container.querySelectorAll(".video-item");
  const [videoOne, videoTwo] = videoList;

  expect(videoList).toHaveLength(2);

  const videoOneTitle = await screen.findByText("EVEN MORE Gags,");
  const videoTwoTitle = await screen.findByText(
    "How Fast X Intertwines With All"
  );

  expect(videoOneTitle).toBeInTheDocument();
  expect(videoTwoTitle).toBeInTheDocument();

  const hiddenVideoPopup = container.querySelector(".visible");
  expect(hiddenVideoPopup).not.toBeInTheDocument();

  await userEvent.click(videoOne);
  const videoPopup = container.querySelector(".visible");

  expect(videoPopup).toBeInTheDocument();
});
