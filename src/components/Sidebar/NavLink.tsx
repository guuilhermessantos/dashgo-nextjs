import { Link as ChakraLink, Icon, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react"
import React from "react"
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
    icon: React.ElementType;
    href: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ icon, href, children, ...rest }) => {
    return (
        <ActiveLink href={href} passHref>
            <ChakraLink d="flex" align="center" {...rest}>
                <Icon as={icon} fontSize="20" />
                <Text ml="4" fontWeight="medium">{children}</Text>
            </ChakraLink>
        </ActiveLink>
    )
}