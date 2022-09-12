import { Box, Stack, Text } from "@chakra-ui/layout"
import React from "react";
import { PaginationItem } from "./PaginationItem"

interface PaginationProps {
	totalCount: number;
	currentPage?: number;
	registersPerPage?: number;
	onPageChange: (page: number) => void;
}

const generatePagesArray = (from: number, to: number) =>
	[...new Array(to - from)]
		.map((_, index) => (from + index + 1))
		.filter(page => page > 0);


export const Pagination = ({
	totalCount,
	currentPage = 1,
	registersPerPage = 10,
	onPageChange
}: PaginationProps) => {
	const lastPage = Math.ceil(totalCount / registersPerPage);
	const siblingsCount = 2;
	const previousPages = currentPage > 1
		? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
		: [];

	const nextPages = currentPage < lastPage
		? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
		: [];

	return (
		<Stack
			direction={["column", "row"]}
			mt="8"
			align="center"
			justify="space-between"
			spacing="6"
		>
			<Box>
				<strong>{(currentPage - 1) * registersPerPage}</strong> - <strong>{Math.min(currentPage * registersPerPage, totalCount)}</strong> de <strong>{totalCount}</strong>
			</Box>
			<Stack direction="row" spacing="2">
				{currentPage > (1 + siblingsCount) && (
					<>
						<PaginationItem onPageChange={onPageChange} pageNumber={1} />
						{currentPage > (2 + siblingsCount) && (
							<Text color="gray.300" w="8" textAlign="center">...</Text>
						)}
					</>
				)}
				{previousPages.length > 0 && previousPages.map(page => (
					<PaginationItem onPageChange={onPageChange} key={page} pageNumber={page} />
				))}
				<PaginationItem onPageChange={onPageChange} isCurrent pageNumber={currentPage} />
				{nextPages.length > 0 && nextPages.map(page => (
					<PaginationItem onPageChange={onPageChange} key={page} pageNumber={page} />
				))}
				{currentPage + siblingsCount < lastPage && (
					<>
						{currentPage + 1 + siblingsCount < lastPage && (
							<Text color="gray.300" w="8" textAlign="center">...</Text>
						)}
						<PaginationItem onPageChange={onPageChange} pageNumber={lastPage} />
					</>
				)}
			</Stack>
		</Stack>
	)
}