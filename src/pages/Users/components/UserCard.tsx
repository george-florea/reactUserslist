import { Card, CardBody, Stack, Heading, Image, Text } from "@chakra-ui/react";

interface IUserCardProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
}
const UserCard = ({
  id,
  firstName,
  lastName,
  email,
  username,
  image,
}: IUserCardProps) => {
  return (
    <Card data-testid="user">
      <CardBody>
        <Image margin={"auto"} src={image} alt={email} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading color="#DD6B20" size="md" textAlign={"center"}>
            @{username}
          </Heading>
          <Stack flexDir="row">
            <Text fontWeight={"800"}>First name:</Text>
            <Text>{firstName}</Text>
          </Stack>
          <Stack flexDir="row">
            <Text fontWeight={"800"}>Last name:</Text>
            <Text>{lastName}</Text>
          </Stack>
          <Stack>
            <Text fontWeight={"800"}>Email:</Text>
            <Text>{email}</Text>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default UserCard;
