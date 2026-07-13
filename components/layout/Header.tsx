"use client";

import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname } from "next/navigation";
import { NotificationBell } from "./NotificationBell";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Lock, LogOut } from "lucide-react";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut, currentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { ChangePasswordModal } from "./ChangePasswordModal";

export function Header() {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);
    const [logout] = useLogoutMutation();
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);

    const userName = user?.name || "Admin";
    const userRole = user?.role || "ADMIN";
    const userPhoto = user?.photo ? `${process.env.NEXT_PUBLIC_API_URL}${user.photo}` : "";
    const initials = userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    if (pathname.includes("/login") || pathname.includes("/register")) {
        return null;
    }

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch {
            // ignore
        }
        dispatch(logOut());
        toast.success("Logged out successfully");
    };

    return (
        <>
            <header className="sticky top-0 z-30 flex shrink-0 h-16 items-center justify-between gap-2 border-b bg-white px-2 sm:px-6">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1 lg:hidden" />
                </div>

                <div className="flex items-center gap-6">
                    <LanguageSwitch />
                    <NotificationBell />

                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                            <div className="flex items-center gap-3 border-l pl-6 cursor-pointer">
                                <Avatar className="h-9 w-9 border border-slate-200">
                                    <AvatarImage src={userPhoto} alt={userName} />
                                    <AvatarFallback className="bg-blue-600 text-white font-medium text-xs">{initials}</AvatarFallback>
                                </Avatar>
                                <div className="hidden sm:flex flex-col text-left">
                                    <span className="text-sm font-semibold text-slate-900 leading-none mb-1">{userName}</span>
                                    <span className="text-xs text-slate-500 leading-none">{userRole}</span>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" sideOffset={8} className="w-56 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">My Account</DropdownMenuLabel>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator className="bg-slate-100" />
                            <DropdownMenuItem onClick={() => setChangePasswordOpen(true)} className="px-3 py-2.5 rounded-lg cursor-pointer text-slate-700 hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600 gap-2.5 transition-colors">
                                <Lock className="h-4 w-4" />
                                <span className="text-sm font-medium">Change Password</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-100" />
                            <DropdownMenuItem variant="destructive" onClick={handleLogout} className="px-3 py-2.5 rounded-lg cursor-pointer gap-2.5 transition-colors">
                                <LogOut className="h-4 w-4" />
                                <span className="text-sm font-medium">Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <ChangePasswordModal open={changePasswordOpen} onOpenChange={setChangePasswordOpen} />
        </>
    );
}
