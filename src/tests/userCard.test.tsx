import React from "react";
import { render, screen } from "@testing-library/react";
import UserCard from "../pages/Users/components/UserCard";
import "@testing-library/jest-dom";

describe("UserCard Component", () => {
  const mockProps = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    image: "https://example.com/image.jpg",
  };

  test("renders UserCard with correct information", () => {
    render(<UserCard {...mockProps} />);

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProps.image);

    const userNameHeading = screen.getByText(`@${mockProps.username}`);
    expect(userNameHeading).toBeInTheDocument();

    expect(screen.getByText("First name:")).toBeInTheDocument();
    expect(screen.getByText(mockProps.firstName)).toBeInTheDocument();

    expect(screen.getByText("Last name:")).toBeInTheDocument();
    expect(screen.getByText(mockProps.lastName)).toBeInTheDocument();

    expect(screen.getByText(mockProps.email)).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<UserCard {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
