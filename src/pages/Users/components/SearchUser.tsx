import { Box, FormLabel, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface ISearchUser {
  onSearch: (query: string) => void;
}

const SearchUser = ({ onSearch }: ISearchUser) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      onSearch("");
      return;
    }

    const handler = setTimeout(() => {
      onSearch(searchTerm);
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
