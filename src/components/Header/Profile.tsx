import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center" >
      <Box mr="4" textAlign="right">
        <Text> Guilherme Santos </Text>
        <Text color="gray.300" fontSize="small" > 
          guuilhermessantos@gmail.com 
        </Text>
      </Box>

      <Avatar size="md" name="Guilherme Santos" src="https://github.com/guuilhermessantos.png"/>
      </Flex>
  );
}