import { useQuery } from "@tanstack/react-query";
import axios from 'axios'
import baseUrl from "../utils/config";

const fetchData = (endpoint) => {

    return axios.get(`${baseUrl}${endpoint}`, {})
}

export const useGenericQueryHook = (endpoint, key, enabled) => {

    return useQuery({
        queryKey: [`${key}`],
        queryFn: () => fetchData(endpoint),
        enabled: enabled,

    })
}