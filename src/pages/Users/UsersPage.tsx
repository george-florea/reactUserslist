import "./styles/users.css";
import UserList from "./components/UserList";
import SearchUser from "./components/SearchUser";
import { VStack } from "@chakra-ui/react";

const UsersPage = () => {
  return (
    <VStack spacing="24px" margin={5}>
      <SearchUser />
      <UserList />
    </VStack>
  );
};

export default UsersPage;
