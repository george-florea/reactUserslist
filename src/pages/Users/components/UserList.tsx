import React, { useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import UserCard from "./UserCard";
import {
  Button,
  FormLabel,
  Heading,
  HStack,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { userActions } from "../../../store/reducers/user";
import useUserService from "../../../services/UserService";

interface IUserListProps {
  users: IUser[];
}

const UserList = ({ users }: IUserListProps) => {
  const dispatch = useDispatch();
  const { getAllUsers } = useUserService();
  const { total, skip, limit } = useSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      await getAllUsers();
      setLoading(false);
    };
    fetchUsers();
  }, [skip, limit]);

  const totalPages = Math.ceil(total / limit);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      dispatch(userActions.setSkip(skip - limit));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      dispatch(userActions.setSkip(skip + limit));
    }
  };

  const handleLimitChange = (value: string) => {
    const newLimit = Number(value);
    dispatch(userActions.setLimit(newLimit));
    dispatch(userActions.setSkip(0));
    setCurrentPage(1);
  };

  return (
    <>
      <Heading>User list:</Heading>
      <HStack>
        <FormLabel htmlFor="itemsPerPage">Items per page:</FormLabel>
        <Select
          id="itemsPerPage"
          placeholder="Select option"
          onChange={(e) => handleLimitChange(e.target.value)}
        >
          <option value="5">5</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </Select>
      </HStack>
      <HStack spacing={4} marginTop={4}>
        <Button onClick={handlePrevious} isDisabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={handleNext} isDisabled={currentPage === totalPages}>
          Next
        </Button>
      </HStack>
      {loading ? (
        <Spinner />
      ) : (
        <div data-testid="user-list" className="grid-container">
          {users.map((el: IUser) => (
            <UserCard key={el.id} {...el} />
          ))}
        </div>
      )}
    </>
  );
};

export default UserList;
