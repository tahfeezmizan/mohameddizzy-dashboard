import ProtectedRoute from "@/components/shared/ProtectedRoute";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
