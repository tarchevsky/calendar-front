import {AuthForm} from "@/app/(auth)/AuthForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Register'
}

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className='p-8 rounded-lg shadow-md'>
                <h2 className='font-semibold mb-4'>Регистрация</h2>
                <AuthForm isLogin={false} />
            </div>
        </div>
    )}