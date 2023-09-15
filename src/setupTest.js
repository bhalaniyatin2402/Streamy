import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

export function createServer(handlerConfig) {
  const handlers = handlerConfig.map((config) => {
    return rest[config.method || "get"](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });
  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
}

beforeAll(() => {
  window.scrollTo = vi.fn()
})

afterAll(() => {
  window.scrollTo = vi.fn()
});
