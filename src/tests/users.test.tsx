import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "../pages/Users/components/UserList";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import * as userService from "../services/UserService";
import { IUser } from "../pages/Users/interfaces/IUser";

const mockStore = configureStore([]);

describe("UserList", () => {
  const users: IUser[] = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    firstName: `First${index + 1}`,
    lastName: `Last${index + 1}`,
    email: `user${index + 1}@example.com`,
    username: `user${index + 1}`,
    image: "image-url",
  }));

  const mockGetAllUsers = jest.fn().mockResolvedValue(users);

  beforeEach(() => {
    jest.spyOn(userService, "default").mockImplementation(() => ({
      getAllUsers: mockGetAllUsers,
      getFilteredUsers: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render the correct number of UserCards", async () => {
    const initialState = {
      user: {
        users: users,
        total: users.length,
        skip: 0,
        limit: 30,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UserList users={users} />
      </Provider>
    );

    await screen.findByTestId("user-list");
    expect(screen.getAllByTestId("user")).toHaveLength(users.length);
  });
});
