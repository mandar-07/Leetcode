import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../api/authApi";
import { getToken } from "../utils/auth";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        enabled: !!getToken(),
        retry: false,
    });
}