import {useProfile} from "@/hooks/useProfile";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import authService from "@/services/auth/auth.service";
import Image from "next/image";
import {LogOut} from "lucide-react";

export function ProfileInfo() {
    const {push} = useRouter();

    const {user} = useProfile()

    const {mutate: mutateLogout, isPending: isLogoutPending} = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logout(),
        onSuccess() {
            push('/login')
        }
    })

    return (
        user && (
            <div>
                <h2 className='text-2xl font-bold'>Добрый день!</h2>
                <p className='text-lg'>Ваш email: {user.email}</p>
                <p className='text-lg'>Роль: {user.role} {!user.isAdmin ? '(Вы не администратор)' : <></>}</p>

                <button onClick={() => mutateLogout()} disabled={isLogoutPending}><LogOut/></button>
            </div>
        )
    )
}