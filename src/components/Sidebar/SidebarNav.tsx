import {  Stack } from "@chakra-ui/layout"
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri"
import { NavLink } from "./NavLink"
import { NavSection } from "./NavSection"

export const SidebarNav = () => {
    return (
        <Stack spacing="12" align="flex-start">
                <NavSection title="GERAL">
                    <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
                    <NavLink icon={RiContactsLine} href="/users">Usuários</NavLink>
                </NavSection>

                <NavSection title="GERAL">
                    <NavLink icon={RiInputMethodLine} href="/formularios">Formulários</NavLink>
                    <NavLink icon={RiGitMergeLine} href="/automacao">Automação</NavLink>
                </NavSection>
            </Stack>
    )
}