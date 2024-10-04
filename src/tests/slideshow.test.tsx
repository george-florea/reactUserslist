import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Slideshow from "../pages/Users/components/Slideshow";
import "@testing-library/jest-dom";

describe("Slideshow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should render a UserCard in Slideshow", () => {
    const users = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        username: "johndoe",
        image: "image-url",
      },
    ];

    render(<Slideshow users={users} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should transition to the next user after 2 seconds", () => {
    jest.useFakeTimers();
    const users = [
      {
        id: 1,
        firstName: "TEST1",
        lastName: "Doe",
        email: "john@example.com",
        username: "johndoe",
        image: "image-url",
      },
      {
        id: 2,
        firstName: "TEST2",
        lastName: "Smith",
        email: "jane@example.com",
        username: "janesmith",
        image: "image-url",
      },
    ];

    render(<Slideshow users={users} />);
    expect(screen.getByText(/TEST1/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/TEST2/i)).toBeInTheDocument();
    jest.useRealTimers();
  });

  it("should start and stop the slideshow", () => {
    const users = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        username: "johnny",
        image: "image-url-1",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        username: "jane",
        image: "image-url-2",
      },
    ];

    const { getByText } = render(<Slideshow users={users} />);

    expect(screen.getByText("John")).toBeInTheDocument();

    fireEvent.click(getByText(/Stop/i));

    jest.advanceTimersByTime(2000);
    expect(screen.getByText("John")).toBeInTheDocument();
  });
});
