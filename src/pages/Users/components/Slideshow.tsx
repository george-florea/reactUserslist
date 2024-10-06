import React, { useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import UserCard from "./UserCard";
import { Button, Heading, HStack } from "@chakra-ui/react";
interface IUserListProps {
  users: IUser[];
}
const Slideshow = ({ users }: IUserListProps) => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [isLooping, setIsLooping] = useState<boolean>(true);

  useEffect(() => {
    setSelectedUser(0);
  }, [users]);

  useEffect(() => {
    let int = setInterval(() => {
      isLooping &&
        setSelectedUser((oldVal: number) =>
          oldVal === users.length - 1 ? 0 : oldVal + 1
        );
    }, 2000);
    return () => clearInterval(int);
  }, [users, isLooping]);

  return (
    <div data-testid="slideshow">
      <Heading>Slideshow:</Heading>
      <UserCard {...users[selectedUser]}></UserCard>
      <HStack
        alignItems={"center"}
        justifyContent={"space-around"}
        marginTop={5}
      >
        <Button onClick={() => setIsLooping(true)}>Start</Button>
        <Button onClick={() => setIsLooping(false)}>Stop</Button>
      </HStack>
    </div>
  );
};

const areUsersEqual = (prevUsers: IUser[], nextUsers: IUser[]) => {
  if (prevUsers.length !== nextUsers.length) return false;

  return prevUsers.every(
    (user, index) => JSON.stringify(user) === JSON.stringify(nextUsers[index])
  );
};

export default React.memo(Slideshow, (prevProps, nextProps) => {
  return areUsersEqual(prevProps.users, nextProps.users);
});
