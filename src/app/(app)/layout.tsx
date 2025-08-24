import { AuthProvider } from "@/components/auth-provider";
import { ProtectedRoute } from "@/components/protected-route";
import { AppLayout } from "@/components/app-layout";
import { GeistSans } from 'geist/font/sans';


export default function ProtectedAppLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className={GeistSans.className}>
            <AuthProvider>
                <ProtectedRoute>
                    <AppLayout>
                        {children}
                    </AppLayout>
                </ProtectedRoute>
            </AuthProvider>
        </main>
    );
}