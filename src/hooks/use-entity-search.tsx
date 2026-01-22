import { useEffect, useState } from "react";
import { PAGINATION } from "@/config/constants";


interface UseEntitySearchProps<T extends { search: string; page: number }> {
    params: T;
    setParams: (params: T) => void;
    debounceMs?: number;
}

export function useEntitySearch<T extends { search: string; page: number }>({
    params,
    setParams,
    debounceMs = 500, // debounceMs is the delay in milliseconds before updating the search parameter, this is done to avoid excessive updates while typing, for example in a search input the user might type quickly and we don't want to update the search parameter on every keystroke

}: UseEntitySearchProps<T>) {
    const [localSearch, setLocalSearch] = useState(params.search);

    useEffect(() => {
        if (localSearch === "" && params.search !== "") {
            setParams({
                ...params,
                search:"",
                page: PAGINATION.DEFAULT_PAGE,
            });
            return;
        }
        const timer = setTimeout(() => {
            if (localSearch !== params.search) {
                setParams({
                    ...params,
                    search: localSearch,
                    page: PAGINATION.DEFAULT_PAGE,
                });
            }
        }, debounceMs);
        return () => clearTimeout(timer); // Clear the timeout if localSearch, params, setParams, or debounceMs changes before the timeout completes
    }, [localSearch, params, setParams, debounceMs]);

    useEffect(() => {
        setLocalSearch(params.search);
    }, [params.search]);

    return {
        searchValue: localSearch,
        onSearchChange: setLocalSearch,
    };
};
    