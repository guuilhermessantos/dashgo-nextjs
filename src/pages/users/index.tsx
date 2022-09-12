import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import NextLink from 'next/link';
import { useUsers } from "../../hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/axios/api";

type User = {
	id: string;
	name: string;
	email: string;
	created_at: string;
}

const UserList = () => {
	const [page, setPage] = useState(1);
	const { data, isLoading, error, isFetching } = useUsers<User>(page);

	const isWideVersion = useBreakpointValue({
		base: false,
		lg: true,
	});

	const handlePrefetchData = async (userId: string) => {
		await queryClient.prefetchQuery(['user', userId], async () => {
			const { data } = await api.get(`/users/${userId}`);

			return data;
		}, { staleTime: 1000 * 60 * 10 });
	}

	return (
		<Box>
			<Header />
			<Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
				<Sidebar />
				<Box flex="1" borderRadius={8} bg="gray.800" p="8">
					<Flex mb="8" justify="space-between" align="center">
						<Heading size="lg" fontWeight="normal">
							Usuários
							{!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
						</Heading>
						<NextLink href="/users/create" passHref>
							<Button
								as="a"
								size="sm"
								fontSize="sm"
								colorScheme="pink"
								cursor="pointer"
								leftIcon={<Icon
									as={RiAddLine}
								/>}
							>
								Criar novo
                        </Button>
						</NextLink>
					</Flex>
					{isLoading ? (
						<Flex justify="center">
							<Spinner />
						</Flex>
					) : error ? (
						<Flex justify="center"><Text>Falha ao obter os usuários</Text></Flex>
					) : (
						<>
							<Table colorScheme="whiteAlpha">
								<Thead>
									<Tr>
										<Th px={["4", "4", "6"]} color="gray.300" w="8">
											<Checkbox colorScheme="pink" />
										</Th>
										<Th>Usuário</Th>
										{isWideVersion && <Th>Data de cadastro</Th>}
										{isWideVersion && <Th></Th>}
									</Tr>
								</Thead>
								<Tbody>
									{data.users.map(user => (
										<Tr key={user.id}>
											<Td px={["4", "4", "6"]}>
												<Checkbox colorScheme="pink" />
											</Td>
											<Td>
												<Box>
													<Link color="purple.400" onMouseEnter={() => handlePrefetchData(user.id)}>
														<Text fontWeight="bold">{user.name}</Text>
													</Link>
													<Text fontSize="sm" color="gray.300">{user.email}</Text>
												</Box>
											</Td>
											{isWideVersion && <Td>{user.created_at}</Td>}
											{isWideVersion && (<Td>
												<Button
													as="a"
													size="sm"
													fontSize="sm"
													colorScheme="blue"
													cursor="pointer"
													leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
												>
													Editar
										</Button>
											</Td>)}
										</Tr>
									))}
								</Tbody>
							</Table>
							<Pagination
								totalCount={data.totalCount}
								currentPage={page}
								onPageChange={setPage}
							/>
						</>
					)}
				</Box>
			</Flex>
		</Box>
	)
}

export default UserList;