import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/features/admin/AdminSidebar";

export default async function AdminShellLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-[var(--color-off-white)] p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
