import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse, categoryResponsePage2 } from "../mocks";
import { ListCategory } from "./ListCategory";

export const handlers = [
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.json(categoryResponsePage2), ctx.delay(150));
    }

    return res(ctx.delay(150), ctx.status(200), ctx.json(categoryResponse));
  }),

  rest.delete(
    `${baseUrl}/categories/cbdd550c-ad46-4e50-be8d-a8266aff4162`,
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204));
    }
  ),
];

const server = setupServer(...handlers);

describe("ListCategory", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<ListCategory />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<ListCategory />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render success state", async () => {
    renderWithProviders(<ListCategory />);
    // esperar que o elemento seja renderizado
    await waitFor(() => {
      const name = screen.getByText("PaleTurquoise");
      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<ListCategory />);

    await waitFor(() => {
      const error = screen.getByText("Error Fetching Categories");
      expect(error).toBeInTheDocument();
    });
  });

  it("should handle On PageChange", async () => {
    renderWithProviders(<ListCategory />);

    await waitFor(() => {
      const name = screen.getByText("PaleTurquoise");
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const name = screen.getByText("SeaGreen");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle filter change", async () => {
    renderWithProviders(<ListCategory />);
    // esperar que o elemento seja renderizado
    await waitFor(() => {
      const name = screen.getByText("PaleTurquoise");
      expect(name).toBeInTheDocument();
    });
    // pegar o input com o placeholder "Search..."
    const input = screen.getByPlaceholderText("Search…");

    // Fire event on change
    fireEvent.change(input, { target: { value: "PapayaWhip" } });

    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });
  });

  it("should handle Delete Category success", async () => {
    renderWithProviders(<ListCategory />);

    await waitFor(() => {
      const name = screen.getByText("PaleTurquoise");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Category deleted successfully!");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle Delete Category error", async () => {
    server.use(
      rest.delete(
        `${baseUrl}/categories/cbdd550c-ad46-4e50-be8d-a8266aff4162`,
        (_, res, ctx) => {
          return res(ctx.delay(150), ctx.status(500));
        }
      )
    );

    renderWithProviders(<ListCategory />);

    await waitFor(() => {
      const name = screen.getByText("PaleTurquoise");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const name = screen.getByText("Error deleting category!");
      expect(name).toBeInTheDocument();
    });
  });
});