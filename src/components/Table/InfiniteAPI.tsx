import axios from "axios";
import { MRT_ColumnFiltersState, MRT_SortingState } from "material-react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UserApiResponse } from "../../assets/Interfaces";

export function APIDataFetching(columnFilters: MRT_ColumnFiltersState, globalFilter: any, sorting: MRT_SortingState, fetchSize: number, endPoint: string, dataKey: String) {
    if (!endPoint) return {};
    return useInfiniteQuery<UserApiResponse>({
        queryKey: [dataKey, columnFilters, globalFilter, sorting],
        queryFn: async ({ pageParam = 0 }) => {
            const baseUrl = endPoint;
            const params = new URLSearchParams();

            params.set('start', `${pageParam * fetchSize}`);
            params.set('limit', `${fetchSize}`);
            params.set('filters', JSON.stringify(columnFilters ?? []));
            params.set('globalFilter', globalFilter ?? '');
            params.set('sorting', JSON.stringify(sorting ?? []));

            const url = `${baseUrl}?${params.toString()}`;
            const response = await axios.get<UserApiResponse>(url);
            return response.data;
        },
        getNextPageParam: (_lastGroup, groups) => groups.length,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });
}
