'use client'
import {Loader} from "@/components/ui/loader/Loader";
import {useProfile} from "@/hooks/useProfile";
import {ProfileInfo} from "@/app/admin/ProfileInfo";

export default function Home() {
    const {user, isLoading} = useProfile()

    return isLoading ? (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Loader/>
        </div>
    ) : (
        <main className="min-h-screen p-6">
            <ProfileInfo/>
        </main>
    )
}