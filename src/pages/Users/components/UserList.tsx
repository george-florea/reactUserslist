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
  Text,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { userActions } from "../../../store/reducers/user";
import useUserService from "../../../services/UserService";
import Slideshow from "./Slideshow";

const UserList = () => {
  const dispatch = useDispatch();
  const { getAllUsers } = useUserService();
  const { users, total, skip, limit } = useSelector(
    (state: RootState) => state.user
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentSkip, setcurrentSkip] = useState(skip);
  const [currentLimit, setcurrentLimit] = useState(limit);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      await getAllUsers();
      setLoading(false);
    };
    fetchUsers();
  }, [currentSkip, currentLimit]);

  const totalPages = Math.ceil(total / limit);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      dispatch(userActions.setSkip(currentSkip - currentLimit));
      setcurrentSkip(currentSkip - currentLimit);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      dispatch(userActions.setSkip(currentLimit + currentSkip));
      setcurrentSkip(currentLimit + currentSkip);
    }
  };

  const handleLimitChange = (value: string) => {
    const newLimit = Number(value);
    dispatch(userActions.setLimit(newLimit));
    dispatch(userActions.setSkip(0));
    setcurrentLimit(newLimit);
    setcurrentSkip(0);
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
      <Text fontWeight={"bold"}>Total users: {total}</Text>
      {loading ? (
        <Spinner />
      ) : users.length > 0 ? (
        <>
          <div data-testid="user-list" className="grid-container">
            {users.map((el: IUser) => (
              <UserCard key={el.id} {...el} />
            ))}
          </div>

          <Slideshow users={users} />
        </>
      ) : (
        <Heading data-testid="noUsers">No users matched</Heading>
      )}
    </>
  );
};

export default UserList;
