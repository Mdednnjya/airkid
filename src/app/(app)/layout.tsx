import { AuthProvider } from "@/components/auth-provider";
import { ProtectedRoute } from "@/components/protected-route";
import { AppLayout } from "@/components/app-layout";

export default function ProtectedAppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ProtectedRoute>
                <AppLayout>
                    {children}
                </AppLayout>
            </ProtectedRoute>
        </AuthProvider>
    );
}