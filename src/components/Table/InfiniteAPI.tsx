import axios from "axios";
import { MRT_ColumnFiltersState, MRT_SortingState } from "material-react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UserApiResponse } from "../../assets/Interfaces";
const fetchSize = 25;
export function APIDataFetching(columnFilters: MRT_ColumnFiltersState, globalFilter: string | undefined, sorting: MRT_SortingState): { data: any; fetchNextPage: any; isError: any; isFetching: any; isLoading: any; } {
    return useInfiniteQuery<UserApiResponse>({
        queryKey: ['table-data', columnFilters, globalFilter, sorting],
        queryFn: async ({ pageParam = 0 }) => {
            const baseUrl = 'users';
            const params = new URLSearchParams();

            params.set('start', `${pageParam * fetchSize}`);
            params.set('limit', `${fetchSize}`);
            params.set('filters', JSON.stringify(columnFilters ?? []));
            params.set('globalFilter', globalFilter ?? '');
            params.set('sorting', JSON.stringify(sorting ?? []));

            const url = `${baseUrl}?${params.toString()}`;
            const response = await axios.get(url);
            return response.data as UserApiResponse;
        },
        getNextPageParam: (_lastGroup, groups) => groups.length,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });
}