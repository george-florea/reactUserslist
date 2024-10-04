import React, { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import { IUser } from "./interfaces/IUser";
import "./styles/users.css";
import useUserService from "../../services/UserService";
import UserList from "./components/UserList";
import Slideshow from "./components/Slideshow";
import SearchUser from "./components/SearchUser";
import { Container, Heading, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const UsersPage = () => {
  const { users } = useSelector((state: RootState) => state.user);
  const { getAllUsers, getFilteredUsers } = useUserService();
  useEffect(() => {
    const getUsers = async () => {
      await getAllUsers();
    };
    getUsers();
  }, []);
  const handleSearch = async (query: string) => {
    if (query) {
      await getFilteredUsers(query);
    } else {
      await getAllUsers();
    }
  };
  return (
    <VStack spacing="24px" margin={5}>
      <SearchUser onSearch={handleSearch} />
      {users.length > 0 ? (
        <>
          <UserList users={users} />
          <Slideshow users={users} />
        </>
      ) : (
        <Heading>There are no users</Heading>
      )}
    </VStack>
  );
};

export default UsersPage;
