import React from "react";
import UsersPage from "./pages/Users/UsersPage";
import { Heading } from "@chakra-ui/react";

const Main = () => {
  return (
    <>
      <Heading as={"h1"}>Homework assignment</Heading>
      <UsersPage />
    </>
  );
};

export default Main;
