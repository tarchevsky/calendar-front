import {PropsWithChildren} from "react";

import {redirect} from "next/navigation";
import {getServerAuth} from "@/utils/get-server-auth";

export default async function Layout({children}: PropsWithChildren<unknown>) {
    const user = await getServerAuth()

    if (user?.isLoggedIn)
        return redirect(user.isAdmin ? '/' : '/')

    return children
}