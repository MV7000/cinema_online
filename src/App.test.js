import { render, screen } from "@testing-library/react";
import App from "./App";
// Тести елементів проекту
describe("Elements on Main Page", () => {
  test("renders headers of galeries", () => {
    render(<App />);
    const moviesTitle = screen.getByText(/trending movies/i);
    const starsTitle = screen.getByText(/trending stars/i);
    expect(moviesTitle).toBeInTheDocument();
    expect(starsTitle).toBeInTheDocument();
  });
  test("footer exist with text", () => {
    render(<App />);
    const footerText = screen.getByText("Vilm © 2021");
    expect(footerText).toBeInTheDocument();
  });
  // Снепшот головної сторінки
  test("Project snapshot", () => {
    const mainElement = render(<App />);
    expect(mainElement).toMatchSnapshot();
  });
  test("search element on page", () => {
    render(<App />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });
});
