"use client";

import { useAppSelector } from "@/redux/hooks";
import { currentToken, currentUser } from "@/redux/features/auth/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token = useAppSelector(currentToken);
    const user = useAppSelector(currentUser);
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const isAuthPage = pathname === "/login" || pathname === "/register";

            if (!token || !user) {
                // Not logged in
                if (!isAuthPage) {
                    router.replace("/login");
                } else {
                    setIsLoading(false);
                }
            } else {
                // Logged in
                if (isAuthPage) {
                    router.replace("/");
                } else {
                    setIsLoading(false);
                }
            }
        };

        checkAuth();
    }, [token, user, router, pathname]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <p className="text-sm font-medium text-slate-500">Checking authentication...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
