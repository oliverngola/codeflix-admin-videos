import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { CreateGenre } from "./CreateGenre";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse } from "../mocks";

const handlers = [
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(ctx.json(categoryResponse));
  }),

  rest.post(`${baseUrl}/genres`, (_, res, ctx) => {
    return res(ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe("CreateGenre", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CreateGenre />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CreateGenre />);
    const name = screen.getByTestId("name");
    const submit = screen.getByText("Save");

    await waitFor(() => {
      expect(submit).toBeInTheDocument();
    });

    fireEvent.change(name, { target: { value: "test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Genre created");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle error", async () => {
    server.use(
      rest.post(`${baseUrl}/genres`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<CreateGenre />);
    const name = screen.getByTestId("name");
    const submit = screen.getByText("Save");

    await waitFor(() => {
      expect(submit).toBeInTheDocument();
    });

    fireEvent.change(name, { target: { value: "test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Error creating genre");
      expect(text).toBeInTheDocument();
    });
  });
});