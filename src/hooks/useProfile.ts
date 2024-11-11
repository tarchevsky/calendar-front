import {useQuery} from "@tanstack/react-query";
import authService from "@/services/auth/auth.service";
import {useEffect} from "react";
import {saveTokenStorage} from "@/services/auth/auth.helper";
import {transformUserToState} from "@/utils/transform-user-to-state";

export function useProfile() {
    const {data, isLoading} = useQuery({
        queryKey: ['profile'],
        queryFn: () => authService.profile(),
        refetchInterval: 1800000 // 30 minutes in milliseconds
    })

    const {isSuccess, data: dataTokens} = useQuery({
        queryKey: ['new tokens'],
        queryFn: () => authService.getNewTokens(),
        enabled: !data?.data
    })

    useEffect(() => {
        if (!isSuccess) return
        if (dataTokens.data.accessToken)
            saveTokenStorage(dataTokens.data.accessToken)
    }, [isSuccess])

    const profile = data?.data

    const userState = profile ? transformUserToState(profile) : null

    return {
        isLoading,

        user: {
            ...profile,
            ...userState
        }
    }
}