import AuthProvider from "@/components/admin/AuthProvider";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        <AdminNav />
        <main className="flex-1 p-8 bg-gray-50/50">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}