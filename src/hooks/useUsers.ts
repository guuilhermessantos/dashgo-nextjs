
import { useQuery } from 'react-query';
import { api } from "../services/axios/api";

type GetUsersResponse<T> = {
	users: T[];
	totalCount: number;
}

const getUsers = async <T>(page: number): Promise<GetUsersResponse<T>> => {
	const { data, headers } = await api.get('users', {
		params: {
			page,
		}
	});
	const totalCount = Number(headers['x-total-count']);
	return {
		totalCount,
		users: data.users.map(user => ({
			...user,
			created_at: new Date(user.created_at).toLocaleDateString('pt-br', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			})
		}))
	};
}

export const useUsers = <T>(page: number) => {
	return useQuery(['users', page], () => getUsers<T>(page), { staleTime: 1000 * 5 });
}