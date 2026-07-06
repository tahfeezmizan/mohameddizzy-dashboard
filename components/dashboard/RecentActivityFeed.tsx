"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/auth/authSlice";
import { useGetActivitiesQuery, TActivity, ActivityType } from "../../redux/features/activity/activityApi";
import { formatDistanceToNow } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useTranslations, useLocale } from "next-intl";
import { Loader2 } from "lucide-react";

export function RecentActivityFeed() {
    const t = useTranslations("dashboard");
    const locale = useLocale();
    const dateFnsLocale = locale === "fr" ? fr : enUS;

    const user = useSelector(currentUser);
    const [page, setPage] = useState(1);
    const { data: activitiesResponse, isLoading, isFetching } = useGetActivitiesQuery({ page, limit: 10 });

    const [activities, setActivities] = useState<TActivity[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize activities from API
    useEffect(() => {
        if (activitiesResponse?.data) {
            setActivities((prev) => {
                if (page === 1) {
                    return activitiesResponse.data;
                }
                const existingIds = new Set(prev.map((a) => a._id));
                const newItems = activitiesResponse.data.filter((a) => !existingIds.has(a._id));
                return [...prev, ...newItems];
            });
        }
    }, [activitiesResponse, page]);

    // Handle scroll for lazy loading
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            if (scrollHeight - scrollTop - clientHeight < 30) {
                const hasNext = activitiesResponse?.meta?.hasNext;
                if (hasNext && !isFetching) {
                    setPage((prev) => prev + 1);
                }
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, [activitiesResponse, isFetching]);

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
            console.log("Connected to socket server for activities");
        });

        socket.on("new_activity", (data: TActivity) => {
            console.log("New Activity Received:", data.message);
            setActivities((prev) => [data, ...prev]);
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
            case "REFUND_PROCESSED":
                return "bg-rose-500";
            case "DISPUTE_CREATED":
            case "DISPUTE_RESOLVED":
                return "bg-orange-500";
            default:
                return "bg-slate-500";
        }
    };

    const formatActivityTime = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { 
                addSuffix: true,
                locale: dateFnsLocale
            });
        } catch {
            return t("justNow");
        }
    };

    return (
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-slate-200 flex flex-col h-full">
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold text-slate-800">{t("recentActivityFeed")}</CardTitle>
            </CardHeader>
            <CardContent ref={containerRef} className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-100 scrollbar-thin scrollbar-thumb-slate-200">
                {isLoading && activities.length === 0 ? (
                    <div className="text-sm text-slate-500 text-center py-4">{t("loadingActivities")}</div>
                ) : activities.length === 0 ? (
                    <div className="text-sm text-slate-500 text-center py-4">{t("noRecentActivities")}</div>
                ) : (
                    <>
                        {activities.map((activity) => (
                            <div key={activity._id || Math.random().toString()} className="flex items-start gap-4 rounded-xl bg-slate-50 p-4 shrink-0 transition-colors hover:bg-slate-100">
                                <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${getActivityColor(activity.type)}`} />
                                <div>
                                    <p className="text-sm font-medium text-slate-800">{activity.message || activity.type}</p>
                                    <p className="text-xs text-slate-500">
                                        {activity.user?.name || "System"} • {formatActivityTime(activity.createdAt)}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {isFetching && page > 1 && (
                            <div className="flex justify-center py-2 shrink-0">
                                <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}
