import { Box, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useUserService from "../../../services/UserService";

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { getAllUsers, getFilteredUsers } = useUserService();

  const handleSearch = async (query: string) => {
    if (query) {
      await getFilteredUsers(query);
    } else {
      await getAllUsers();
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      handleSearch("");
      return;
    }

    const handler = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <Box width="300px" margin="0 auto" padding="10px">
      <FormLabel htmlFor="searchInput">Search users:</FormLabel>
      <Input
        id="searchInput"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  );
};
export default SearchUser;
