import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test, vi } from "vitest";

import { Provider } from "react-redux";
import Home from "../Page/Home";
import { fetchAllBooksData } from "../Redux/Slices/BooksDataSlice";
import { fetchPublishersData } from "../Redux/Slices/PublisherSlice";
import { store } from "../Redux/Store/Store";

globalThis.fetch = vi.fn();

const renderWithProviders = (component) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>
  );
};

describe("Home Page Hero Test", () => {
  test("Hero component is rendered inside Home", () => {
    renderWithProviders(<Home />);

    const hero = screen.getByTestId("hero-section");
    expect(hero).toBeInTheDocument();
  });
});

// Testing booksData slice
describe("BooksDataSlice is testing", () => {
  test("fetchAllBooksData updates store correctly", async () => {
    const mockBooks = [
      { id: 1, title: "Redux Testing Book" },
      { id: 2, title: "How to pro in coding?" },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBooks,
    });

    await store.dispatch(fetchAllBooksData());

    const state = store.getState().booksData;

    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockBooks);
    expect(state.error).toBe(null);
  });
});

// Testing publisher createSlice
describe("Testing Publisher Slice", () => {
  test("fetchPublishersData updated store correctly", async () => {
    const mockPublishers = [{ title: "Publisher One" }, { title: "Publisher Two" }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPublishers,
    });

    await store.dispatch(fetchPublishersData());

    const state = store.getState().publishers;
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockPublishers);
    expect(state.error).toBe(null);
  });
});
