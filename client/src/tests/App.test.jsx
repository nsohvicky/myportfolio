import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

test("renders the home page heading", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

 
  const heading = screen.getByRole("heading", {
    name: /welcome to victorine/i,
  });

  expect(heading).toBeInTheDocument();
});
