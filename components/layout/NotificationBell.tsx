"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetActivitiesQuery, TActivity, ActivityType } from "@/redux/features/activity/activityApi";
import { formatDistanceToNow } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NotificationBell() {
    const user = useSelector(currentUser);
    const { data: activitiesResponse, isLoading } = useGetActivitiesQuery({ page: 1, limit: 10 });
    const [activities, setActivities] = useState<TActivity[]>([]);
    const [hasNew, setHasNew] = useState(false);

    // Initialize activities from API
    useEffect(() => {
        if (activitiesResponse?.data) {
            setActivities(activitiesResponse.data);
        }
    }, [activitiesResponse]);

    // Socket connection for real-time updates
    useEffect(() => {
        if (!user || user.role !== "ADMIN") return;

        const socketUrl = process.env.NEXT_PUBLIC_API_URL || "https://djarna.apponislam.top";

        const socket: Socket = io(socketUrl, {
            auth: {
                _id: user._id,
                role: "ADMIN",
            },
        });

        socket.on("connect", () => {
            console.log("Connected to socket server for notifications");
        });

        socket.on("new_activity", (data: TActivity) => {
            console.log("New Activity Received in Header:", data.message);
            setActivities((prev) => [data, ...prev]);
            setHasNew(true);
        });

        return () => {
            socket.disconnect();
        };
    }, [user]);

    const getActivityColor = (type: ActivityType) => {
        switch (type) {
            case "PAYMENT_COMPLETED":
            case "LOGIN":
                return "bg-emerald-500";
            case "REGISTER":
            case "PRODUCT_CREATE":
                return "bg-blue-500";
            case "ORDER_PLACED":
            case "ORDER_STATUS_UPDATE":
                return "bg-amber-500";
            case "PRODUCT_UPDATE":
                return "bg-indigo-500";
            case "WITHDRAWAL_REQUEST":
                return "bg-rose-500";
            default:
                return "bg-slate-500";
        }
    };

    const formatActivityTime = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true });
        } catch {
            return "just now";
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (open) {
            setHasNew(false);
        }
    };

    return (
        <Popover onOpenChange={handleOpenChange}>
            <PopoverTrigger>
                <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors">
                    <Bell className="h-5 w-5 text-slate-600" />
                    {hasNew && <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 mr-4" align="end">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Recent Activity</h3>
                    <span className="text-xs text-slate-500">{activities.length} activities</span>
                </div>
                <ScrollArea className="h-100">
                    <div className="flex flex-col">
                        {isLoading && activities.length === 0 ? (
                            <div className="p-8 text-center text-sm text-slate-500">Loading activities...</div>
                        ) : activities.length === 0 ? (
                            <div className="p-8 text-center text-sm text-slate-500">No recent activities</div>
                        ) : (
                            activities.map((activity) => (
                                <div key={activity._id || Math.random().toString()} className="flex items-start gap-3 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-default">
                                    <div className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", getActivityColor(activity.type))} />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-medium text-slate-800 leading-snug">{activity.message || activity.type}</p>
                                        <p className="text-xs text-slate-500">
                                            {activity.user?.name || "System"} • {formatActivityTime(activity.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
                <div className="p-3 border-t border-slate-100 text-center">
                    <Link href="/activities" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        View all activities
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    );
}
