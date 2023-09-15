import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../stote/store";

export function renderComponent(component, width = 800) {
  window.innerWidth = width;

  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>
  );

  return { container };
}
