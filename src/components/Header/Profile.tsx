import { Flex, Box, Avatar, Text } from "@chakra-ui/react"
import React from "react"

interface ProfileProps {
    showProfileData?: boolean;
}

export const Profile = ({ showProfileData = true }: ProfileProps) => {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="center">
                    <Text>Guilherme Santos</Text>
                    <Text color="gray.300" fontSize="small">
                        guuilhermessantos@gmail.com
                  </Text>
                </Box>
            )}
            <Avatar size="md" name="Guilherme Santos" src="https://github.com/guuilhermessantos.png" />
        </Flex>
    )
}